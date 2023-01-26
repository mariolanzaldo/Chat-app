const { GraphQLError, GraphQLScalarType, Kind, PossibleFragmentSpreadsRule } = require('graphql');
const { PubSub, withFilter } = require('graphql-subscriptions');

const pubSub = new PubSub();

const resolvers = {
    Query: {
        messages: async (_, { _id }, { dataSources }) => {
            const roomMessages = await dataSources.chatAPI.getMessagesOfRoom(_id);

            return roomMessages;
        },
        user: async (_, { _id }, { req, dataSources }) => {
            const userToFind = { username: _id };

            const { user } = await dataSources.userAPI.getUser(userToFind);

            return user;
        },
        currentUser: async (parent, input, { req, dataSources }) => {
            const { JWT } = req.cookies;

            if (!JWT) {
                throw new GraphQLError('Not Authenticated');
            }

            const response = await dataSources.authAPI.secureRoute(JWT);

            if (!response?.user) {
                throw new GraphQLError('Not Authorized');
            }

            const { user } = await dataSources.userAPI.getUser(response.user);

            const roomsArray = user.rooms.map(async (room) => {
                const newRoom = await dataSources.chatAPI.getRoom(room._id);

                if (newRoom) {
                    room = newRoom;
                }
                return room;
            });

            const completeRooms = await Promise.all(roomsArray);
            user.rooms = completeRooms;

            return user;

        },
        existence: async (parent, input, { dataSources }) => {
            const { username, email } = input;

            if (username) {
                const res = await dataSources.userAPI.fieldExistence({ username });

                return { username: res.exists };
            } else if (email) {
                const res = await dataSources.userAPI.fieldExistence({ email });

                return { email: res.exists };
            }
        },
    },
    User: {
        rooms: async (parent, input, { dataSources }) => {
            const completeRooms = await parent.rooms.map(async (room) => {
                const completeRoom = await dataSources.chatAPI.getRoom(room._id);

                return completeRoom;
            });

            return completeRooms;
        },
        contactList: async (parent, input, { dataSources }) => {
            const response = parent.contactList.map(async (contact) => {
                const { user } = await dataSources.userAPI.getUser({ username: contact });
                const { _id, username, email, firstName, lastName, avatar } = user;
                return { _id, username, email, firstName, lastName, avatar };
            });

            const completeContacts = await Promise.all(response);

            return completeContacts;
        },

    },
    Room: {
        members: async (parent, _, { dataSources }) => {
            const output = parent.members.map(async ({ username, joinedAt }) => {
                const { user } = await dataSources.userAPI.getUser({ username });


                const member = { ...user, joinedAt };
                return member;
            });

            const member = await Promise.all(output);

            return member
        },
        admin: (parent) => {
            const output = parent.admin.map((admin) => admin);

            return output;
        }
    },
    Request: {
        from: async (parent, _, { dataSources }) => {
            const { from: username } = parent;

            const { user } = await dataSources.userAPI.getUser(username);

            return user;
        },
        to: async (parent, _, { dataSources }) => {

            const { to: username } = parent;

            const { user } = await dataSources.userAPI.getUser(username);

            return user;
        }
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        parseLiteral(ast) {
            if (ast.king === Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        }
    }),
    Mutation: {
        createUser: async (parent, { userInput }, { dataSources }) => {
            const {
                username,
                firstName,
                lastName,
                password,
                avatar,
                confirmPassword,
                email,
            } = userInput;

            try {
                const userInfo = await dataSources.userAPI.createUser(username, firstName, lastName, email, avatar);
                const signup = await dataSources.authAPI.signup(username, password);

                return { success: true, errorMessage: null };

            } catch (err) {
                console.log(err.extensions.response.body)
                if (err.extensions.response.body.error.keyValue.email) {
                    throw new GraphQLError("The email has been used");
                } else if (err.extensions.response.body.error.keyValue._id) {
                    throw new GraphQLError("The username has been taked");
                }
            }
        },
        login: async (parent, { userInput }, { dataSources, req, res }) => {
            const authRes = dataSources.authAPI.login(userInput);
            const userRes = dataSources.userAPI.getUser(userInput);
            try {
                const [auth, user] = await Promise.all([authRes, userRes]);

                const { token } = auth;

                const options = {
                    maxAge: 1e9,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                };

                res.cookie("JWT", token, options);

                const roomsArray = user.user.rooms.map(async (room) => {
                    const newRoom = await dataSources.chatAPI.getRoom(room._id);

                    if (newRoom) {
                        room = newRoom;
                    }
                    return room;
                });

                const completeRooms = await Promise.all(roomsArray);
                user.user.rooms = completeRooms;

                return { ...user.user, token };
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message.error ? message.error : message.message ? message.message : message);
            }
        },
        logout: async (parent, { cookieInput }, { dataSources, req, res }) => {
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
        createMessage: async (parent, { messageInput }, { dataSources }) => {
            pubSub.publish("MESSAGE_CREATED", {
                newMessage: messageInput,
            });

            try {
                const createdMessage = await dataSources.chatAPI.createMessage(messageInput);

                return createdMessage.message;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },
        createRoom: async (parent, { roomInput }, { dataSources }) => {
            try {
                const createdRoom = await dataSources.chatAPI.createRoom(roomInput);

                const { _id, name, members, admin } = createdRoom;

                const updatedUsers = members.map(async ({ username }) => await dataSources.userAPI.updateInfo(username, { rooms: { _id } }));

                const groupMembers = await Promise.all(updatedUsers);

                pubSub.publish(`GROUP_CHANGED`, {
                    groupChanged: groupMembers,
                });

                return createdRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },

        addMember: async (parent, { roomInput }, { dataSources }) => {
            const { _id, members } = roomInput;
            let updatedContact;

            const updatedRoom = await dataSources.chatAPI.addMember(_id, members);

            const { name, members: updatedMembers } = updatedRoom;

            const usersPromises = members.map(async ({ username }) => {
                updatedContact = await dataSources.userAPI.updateInfo(username, { rooms: { _id, name } });
                return updatedContact;
            });

            const newMembers = await Promise.all(usersPromises);

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: newMembers,
            });

            return updatedRoom;

        },

        deleteMember: async (parent, { roomInput }, { dataSources }) => {
            const updatedRoom = await dataSources.chatAPI.deleteMember(roomInput._id, roomInput.members);

            const updatedMembers = await roomInput.members.map(async ({ username }) => {
                const updatedMember = await dataSources.userAPI.updateInfo(username, { rooms: { _id: roomInput._id } });
                return updatedMember;
            });

            const deletedMembers = await Promise.all(updatedMembers);

            pubSub.publish(`GROUP_CHANGED`, {
                groupChanged: deletedMembers,
            });

            return updatedRoom;
        },
        addFriend: async (parent, { friendInput }, { dataSources }) => {
            const request = { userA: { username: friendInput.userA[0].username }, userB: { username: friendInput.userB[0].username } };

            try {

                const { user: { requests: userBRequests } } = await dataSources.userAPI.getUser(friendInput.userB[0].username);

                const alreadyOnRequest = userBRequests.filter((element) => {
                    return element.from === friendInput.userA[0].username;
                });

                if (alreadyOnRequest.length > 0) {
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

        acceptFriend: async (parent, { friendInput }, { dataSources }) => {
            const request = { userA: { username: friendInput.userA[0].username }, userB: { username: friendInput.userB[0].username } };

            try {
                const { updatedUserA, updatedUserB } = await dataSources.userAPI.acceptFriend(request);

                const members = [{ username: updatedUserA.username }, { username: updatedUserB.username }];

                const roomInput = {
                    admin: [{ username: updatedUserA.username }, { username: updatedUserB.username }],
                    groupalRoom: false,
                    name: `${updatedUserA.username} and ${updatedUserB.username} conversation`,
                    members: members,
                };

                const { _id } = await dataSources.chatAPI.createRoom(roomInput);

                const updatedUsers = members.map(async ({ username }) => {
                    return await dataSources.userAPI.updateInfo(username, { rooms: { _id } });
                });

                const values = await Promise.all(updatedUsers);

                const roomsArray = values[1].rooms.map(async (room) => {
                    const newRoom = await dataSources.chatAPI.getRoom(room._id);

                    if (newRoom) {
                        room = newRoom;
                    }
                    return room;
                });

                const completeRooms = await Promise.all(roomsArray);

                values[1].rooms = completeRooms;

                pubSub.publish(`FRIEND_REQUEST_ACCEPTED`, {
                    friendRequestAccepted: values[1],
                });

                return { success: true, messageError: null, value: values[0] };

            } catch (err) {
                const message = err.extensions.response.body.error;
                return { succes: false, errorMessage: message };
            }
        },

        rejectFriend: async (parent, { friendInput }, { dataSources }) => {

            try {
                const request = { userA: { username: friendInput.userA[0].username }, userB: { username: friendInput.userB[0].username } };

                const updatedUser = await dataSources.userAPI.rejectFriend(request);

                return { success: false, errorMessage: null, value: updatedUser };
            } catch (err) {
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }
        },

        deleteFriend: async (parent, { friendInput }, { dataSources }) => {
            const { userA, userB, roomId } = friendInput;

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

        addAdmin: async (parent, { roomInput }, { dataSources }) => {
            const { _id, admin } = roomInput;

            try {
                const updatedRoom = await dataSources.chatAPI.addAdmin(_id, admin);

                return updatedRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                return message;
            }
        },
        deleteAdmin: async (parent, { roomInput }, { dataSources }) => {
            const { _id, admin } = roomInput;

            try {
                const updatedRoom = await dataSources.chatAPI.deleteAdmin(_id, admin);

                return updatedRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                return message;
            }
        },
        leaveGroup: async (parent, { roomInput }, { dataSources }) => {
            let removedFromAdmin, removedFromMembers;
            const { _id, admin, members } = roomInput;

            try {
                if (admin) {
                    removedFromAdmin = dataSources.chatAPI.deleteAdmin(_id, admin);
                    removedFromMembers = dataSources.chatAPI.deleteMember(_id, members);

                    await Promise.all([removedFromAdmin, removedFromMembers]);
                } else if (!admin) {
                    await dataSources.chatAPI.deleteMember(_id, members);
                }

                const updatedUser = await dataSources.userAPI.updateInfo(members[0].username, { rooms: { _id } });

                return { success: true, errorMessage: null, value: updatedUser };
            } catch (err) {
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }
        },
        deleteRoom: async (parent, { roomInput }, { dataSources }) => {
            const { _id, members: currentUser } = roomInput;

            try {
                //delete room
                const deletedRoom = await dataSources.chatAPI.deleteRoom(_id);
                //delete messages
                const deletedMessages = await dataSources.chatAPI.deleteAllRoomMessages(_id);

                const { members } = deletedRoom;

                const promiseMembers = members.map(async (user) => {
                    const updatedMember = await dataSources.userAPI.updateInfo(user.username, { rooms: { _id } });

                    return updatedMember;
                });

                const updatedMembers = await Promise.all(promiseMembers);

                const otherUsers = updatedMembers.filter((user) => user.username !== currentUser[0].username);

                pubSub.publish(`GROUP_CHANGED`, {
                    groupChanged: otherUsers,
                });

                const updatedUser = updatedMembers.find((user) => user.username === currentUser[0].username);

                return { success: true, errorMessage: null, value: updatedUser };
            } catch (err) {
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }
        },

        changeLanguage: async (parent, { userInput }, { dataSources }) => {
            const { username, settings } = userInput;

            try {
                const updatedUser = await dataSources.userAPI.updateInfo(username, { settings });

                return { success: true, errorMessage: null, value: updatedUser }
            } catch (err) {
                const message = err.extensions.response.body.error;

                return { success: false, errorMessage: message }
            }
        },
    },
    Subscription: {
        newMessage: {
            subscribe: () => pubSub.asyncIterator("MESSAGE_CREATED"),
        },
        newRoom: {
            subscribe: () => pubSub.asyncIterator("ROOM_CREATED"),
        },
        addFriend: {
            subscribe: () => pubSub.asyncIterator("FRIEND_REQUEST"),
            // subscribe: withFilter(
            //     () => {
            //         return pubSub.asyncIterator("FRIEND_REQUEST");
            //     },
            //     ({ addFriend }, { to }) => {
            //         console.log(addFriend, to);
            //         return true;
            //     }
            // )
        },
        friendRequestAccepted: {
            subscribe: (_, __, { user }) => pubSub.asyncIterator(`FRIEND_REQUEST_ACCEPTED`),
        },
        deleteContact: {
            subscribe: () => pubSub.asyncIterator(`CONTACT_DELETED`),
        },
        groupChanged: {
            subscribe: () => pubSub.asyncIterator(`GROUP_CHANGED`),
        }

    }
};

module.exports = resolvers;