const { createAvatar } = require("@dicebear/avatars");
const style = require('@dicebear/adventurer-neutral');
const validate = require('validator');
const { GraphQLError } = require('graphql');
const pubSub = require('./pubsub');

const mutationResolvers = {
    createUser: async (_, { userInput }, { dataSources }) => {
        const {
            username,
            firstName,
            lastName,
            password,
            // avatar,
            confirmPassword,
            email,
        } = userInput;

        const isValidEmail = validate.isEmail(String(email).toLocaleLowerCase());

        userInput.avatar = createAvatar(style, {
            dataUri: true,
            size: 1280,
        });

        if (password !== confirmPassword || !isValidEmail ||
            username.length > 25 || firstName.length > 25 || lastName.length > 25 ||
            email.length > 80 || password.length > 80 || confirmPassword.length > 80) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            });
        }

        try {
            await dataSources.userAPI.createUser(username, firstName, lastName, email, userInput.avatar);
            await dataSources.authAPI.signup(username, password);

            return { success: true, errorMessage: null };

        } catch (err) {
            if (err.extensions.response.body.error.keyValue.email) {
                throw new GraphQLError("The email has been used");
            } else if (err.extensions.response.body.error.keyValue._id) {
                throw new GraphQLError("The username has been taked");
            }
        }
    },
    login: async (_, { userInput }, { dataSources, res }) => {
        if (userInput.username.length > 25 || userInput.password.length > 80) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            });
        }
        try {
            const auth = await dataSources.authAPI.login(userInput);
            const user = await dataSources.userAPI.getUser(userInput);

            const { token } = auth;

            const options = {
                maxAge: 1e9,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            };

            res.cookie("JWT", token, options);

            return { ...user.user, token };
        } catch (err) {
            const message = err.extensions.response.body.error;

            throw new GraphQLError(message.error ? message.error : message.message ? message.message : message);
        }
    },
    logout: async (_, { cookieInput }, { res }) => {
        const { name } = cookieInput;

        try {
            const options = {
                maxAge: 1e9,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            };

            res.clearCookie(name, options);

            return { sucess: true, messageError: null, value: null };
        } catch (err) {
            const message = err.extensions.response.body.error;

            return { sucess: false, messageError: message, value: null };
        }


    },
    createMessage: async (_, { messageInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        if (!messageInput.isScribble && messageInput.content.length > 5000) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            });
        }

        messageInput.sendBy = authUser.username;

        const getBase64StringFromDataURL = (dataURL) => dataURL.replace('data:', '').replace(/^.+,/, '');

        const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const contentString = getBase64StringFromDataURL(messageInput.content);

        const isScribble = messageInput.content.includes("data:image/png;base64") && base64regex.test(contentString);

        if ((isScribble !== messageInput.isScribble)) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            });
        }

        try {

            const { members } = await dataSources.chatAPI.getRoom(messageInput.roomId);

            const isInRoom = members.find((user) => user.username === authUser.username);

            if (authUser.username !== messageInput.sendBy || !isInRoom) {
                throw new GraphQLError("Internal Error", {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        http: { status: 400 },
                    }
                });
            }

            const createdMessage = await dataSources.chatAPI.createMessage(messageInput);

            pubSub.publish("MESSAGE_CREATED", {
                newMessage: messageInput,
            });

            return createdMessage.message;
        } catch (err) {
            const message = err.extensions.response.body.error;
            throw new GraphQLError(message);
        }
    },
    createRoom: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {
        if (hasAuth) throw hasAuth;

        if (!roomInput.isGroupalRoom || roomInput.name.length > 25) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            });
        }

        const isMember = roomInput.members.find((user) => user.username === authUser.username);
        const isAdmin = roomInput.admin.find((user) => user.username === authUser.username);

        const uniqueMembers = [...new Map(roomInput.members.map(v => [v.username, v])).values()];

        roomInput.members = uniqueMembers;
        uniqueMembers.map((user) => {
            if (user.username !== authUser.username) {

                const isContact = authUser.contactList.find((contact) => {
                    return contact === user.username;
                });

                if (!isContact) {
                    throw new GraphQLError("Internal Error", {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            http: { status: 400 }
                        }
                    });
                }
            }
        });

        if (!isMember || !isAdmin) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 }
                }
            });
        }

        try {

            const createdRoom = await dataSources.chatAPI.createRoom(roomInput);

            const { _id, members } = createdRoom;

            const updatedUsers = members.map(async ({ username }) => await dataSources.userAPI.updateInfo(username, { rooms: { _id } }));

            await Promise.all(updatedUsers);

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: createdRoom,
            });

            return createdRoom;
        } catch (err) {
            const message = err.extensions.response.body.error;
            throw new GraphQLError(message);
        }
    },

    addMember: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const { _id, members } = roomInput;

        let updatedContact;

        const currentRoom = await dataSources.chatAPI.getRoom(_id);

        const isAdmin = currentRoom.admin.find((element) => element.username === authUser.username);

        if (!isAdmin) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            });
        }

        const updatedRoom = await dataSources.chatAPI.addMember(_id, members);

        const { name } = updatedRoom;

        const usersPromises = members.map(async ({ username }) => {
            updatedContact = await dataSources.userAPI.updateInfo(username, { rooms: { _id, name } });
            return updatedContact;
        });

        await Promise.all(usersPromises);

        pubSub.publish(`GROUP_CHANGED`, {
            groupChanged: updatedRoom,
        });

        return updatedRoom;

    },

    deleteMember: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const { _id, members } = roomInput;

        const currentRoom = await dataSources.chatAPI.getRoom(_id);

        const isAdmin = currentRoom.admin.find((element) => element.username === authUser.username);

        if (!isAdmin) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            });
        }

        const updatedRoom = await dataSources.chatAPI.deleteMember(_id, members);

        await members.map(async ({ username }) => {
            const updatedMember = await dataSources.userAPI.updateInfo(username, { rooms: { _id } });
            return updatedMember;
        });

        pubSub.publish(`GROUP_CHANGED`, {
            groupChanged: updatedRoom,
        });

        return updatedRoom;
    },
    addFriend: async (_, { friendInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const request = { userA: { username: authUser.username }, userB: { username: friendInput.userB[0].username.trim() } };

        if (request.userA.username === request.userB.username || request.userA.username !== authUser.username || friendInput.userB[0].username.length > 25) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 }
                }
            })
        }

        try {

            const { user: { requests: userBRequests } } = await dataSources.userAPI.getUser(friendInput.userB[0].username);

            const isOnRequest = userBRequests.filter((element) => {
                return element.from === request.userA.username;
            });

            if (isOnRequest.length > 0) {
                throw new GraphQLError("Request already sent", {
                    extensions: {
                        code: "FORBIDDEN",
                    }
                });
            }
            const response = await dataSources.userAPI.friendRequest(request);

            const req = {
                from: {
                    username: response.from,
                },
                to: {
                    username: response.to,
                }
            }

            pubSub.publish("FRIEND_REQUEST", {
                addFriend: req,
            });

            return response;
        } catch (err) {
            const message = err.extensions.response?.body.error ? err.extensions.response.body.error : err;
            throw new GraphQLError(message);
        }

    },

    acceptFriend: async (_, { friendInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const request = { userA: { username: authUser.username }, userB: { username: friendInput.userB[0].username } };

        if (request.userA.username !== authUser.username) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            })
        }

        try {
            const { updatedUserA, updatedUserB } = await dataSources.userAPI.acceptFriend(request);

            const members = [{ username: updatedUserA.username }, { username: updatedUserB.username }];

            const roomInput = {
                admin: [{ username: updatedUserA.username }, { username: updatedUserB.username }],
                isGroupalRoom: false,
                name: `${updatedUserA.username} and ${updatedUserB.username} conversation`,
                members: members,
            };

            const { _id } = await dataSources.chatAPI.createRoom(roomInput);

            const updatedUsers = members.map(async ({ username }) => {
                return await dataSources.userAPI.updateInfo(username, { rooms: { _id } });
            });

            const values = await Promise.all(updatedUsers);

            pubSub.publish(`FRIEND_REQUEST_ACCEPTED`, {
                friendRequestAccepted: values[1],
            });

            return { success: true, messageError: null, value: values[0] };

        } catch (err) {
            const message = err.extensions.response.body.error;
            return { succes: false, errorMessage: message };
        }
    },

    rejectFriend: async (_, { friendInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const request = { userA: { username: authUser.username }, userB: { username: friendInput.userB[0].username } };

        if (request.userA.username !== authUser.username) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 },
                }
            })
        }

        try {
            const updatedUser = await dataSources.userAPI.rejectFriend(request);

            return { success: false, errorMessage: null, value: updatedUser };
        } catch (err) {
            const message = err.extensions.response.body.error;
            return { success: false, errorMessage: message };
        }
    },

    deleteFriend: async (_, { friendInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const { userB, roomId } = friendInput;
        const userA = [{ username: authUser.username }];

        if (userA[0].username !== authUser.username) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: { status: 400 }
                }
            })
        }

        try {
            const deletedRoom = await dataSources.chatAPI.deleteRoom(roomId);

            //Erase friend
            const { updatedUserA, updatedUserB } = await dataSources.userAPI.deleteFriend({ userA, userB });

            //Erase rooms
            //From main user
            const updatedRooms = updatedUserA.rooms.filter((room) => room._id !== deletedRoom._id);
            const updatedUser = await dataSources.userAPI.updateInfo(updatedUserA.username, { rooms: updatedRooms });

            //From the other user
            const updatedRoomsB = updatedUserB.rooms.filter((room) => room._id !== deletedRoom._id);
            const secondaryUser = await dataSources.userAPI.updateInfo(updatedUserB.username, { rooms: updatedRoomsB });

            //Erase messages
            const deletedMessages = await dataSources.chatAPI.deleteAllRoomMessages(roomId);

            pubSub.publish(`CONTACT_DELETED`, {
                deleteContact: secondaryUser,
            });

            return { success: true, errorMessage: null, value: updatedUser };
        } catch (err) {
            const message = err.extensions.response.body.error;
            return { success: false, errorMessage: message };
        }
    },

    addAdmin: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const { _id, admin } = roomInput;

        const currentRoom = await dataSources.chatAPI.getRoom(_id);

        const isAdmin = currentRoom.admin.find((element) => element.username === authUser.username);

        const areMembers = admin.find((user) => {

            const isMember = currentRoom.members.find((element) => element.username === user.username);

            if (isMember) {
                return isMember;
            }
        });

        if (!isAdmin || !areMembers) {
            throw new GraphQLError("Internal Error",
                {
                    extensions: {
                        code: 'BAD_REQUEST',
                        http: { status: 400 },
                    }
                }
            );
        }

        try {
            const updatedRoom = await dataSources.chatAPI.addAdmin(_id, admin);

            const response = admin.map(async ({ username }) => {
                const { user } = await dataSources.userAPI.getUser(username);
                return user;
            });

            await Promise.all(response);

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: updatedRoom,
            });

            return updatedRoom;
        } catch (err) {
            const message = err.extensions.response.body.error;
            return message;
        }
    },
    deleteAdmin: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        const { _id, admin } = roomInput;

        const currentRoom = await dataSources.chatAPI.getRoom(_id);

        const isAdmin = currentRoom.admin.find((element) => element.username === authUser.username);

        if (!isAdmin) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_REQUEST',
                    http: { status: 401 },
                }
            });
        }

        try {

            const updatedRoom = await dataSources.chatAPI.deleteAdmin(_id, admin);

            const response = admin.map(async ({ username }) => {
                const { user } = await dataSources.userAPI.getUser(username);
                return user;
            });

            await Promise.all(response);

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: updatedRoom,
            });

            return updatedRoom;
        } catch (err) {
            const message = err.extensions.response.body.error;
            return message;
        }
    },
    leaveGroup: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {
        if (hasAuth) throw hasAuth;

        let removedFromAdmin, removedFromMembers;
        const { _id, admin, members } = roomInput;

        const currentRoom = await dataSources.chatAPI.getRoom(_id);

        const isMember = currentRoom.members.find((element) => element.username === authUser.username);

        if (!isMember || members[0].username !== authUser.username) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'BAD_REQUEST',
                    http: { status: 401 },
                }
            });
        }

        try {
            if (admin) {
                removedFromAdmin = dataSources.chatAPI.deleteAdmin(_id, admin);
                removedFromMembers = dataSources.chatAPI.deleteMember(_id, members);

                await Promise.all([removedFromAdmin, removedFromMembers]);
            } else if (!admin) {
                await dataSources.chatAPI.deleteMember(_id, members);
            }

            const updatedRoom = await dataSources.chatAPI.getRoom(_id);

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: updatedRoom,
            });

            const updatedUser = await dataSources.userAPI.updateInfo(members[0].username, { rooms: { _id } });

            return { success: true, errorMessage: null, value: updatedUser };
        } catch (err) {
            const message = err.extensions.response.body.error;
            return { success: false, errorMessage: message };
        }
    },
    deleteRoom: async (_, { roomInput }, { dataSources, authUser, hasAuth }) => {
        if (hasAuth) throw hasAuth;

        const { _id, members: currentUser } = roomInput;

        const currentRoom = await dataSources.chatAPI.getRoom(_id);

        const isAdmin = currentRoom.admin.find((element) => element.username === authUser.username);

        if (!isAdmin) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            });
        }

        try {

            //delete room
            const deletedRoom = await dataSources.chatAPI.deleteRoom(_id);
            //delete messages
            await dataSources.chatAPI.deleteAllRoomMessages(_id);

            const { members } = deletedRoom;

            const promiseMembers = members.map(async (user) => {
                const updatedMember = await dataSources.userAPI.updateInfo(user.username, { rooms: { _id } });

                return updatedMember;
            });

            const updatedMembers = await Promise.all(promiseMembers);

            const updatedUser = updatedMembers.find((user) => user.username === currentUser[0].username);
            deletedRoom.isDeleted = true;

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: deletedRoom,
            });

            return { success: true, errorMessage: null, value: updatedUser };
        } catch (err) {
            const message = err.extensions.response.body.error;
            return { success: false, errorMessage: message };
        }
    },

    changeLanguage: async (_, { settingsInput }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        try {
            const updatedUser = await dataSources.userAPI.updateInfo(authUser.username, { settings: settingsInput });

            return { success: true, errorMessage: null, value: updatedUser }
        } catch (err) {
            const message = err.extensions.response.body.error;

            return { success: false, errorMessage: message }
        }
    },
};

module.exports = mutationResolvers;