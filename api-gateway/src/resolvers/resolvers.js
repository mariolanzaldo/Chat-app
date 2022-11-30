const express = require('express');
const { GraphQLError, GraphQLScalarType, Kind, PossibleFragmentSpreadsRule } = require('graphql');
const { PubSub } = require('graphql-subscriptions');

const router = express.Router();
const pubSub = new PubSub();

const resolvers = {
    Query: {
        messages: async (_, { _id }, { dataSources }) => {
            const roomMessages = await dataSources.chatAPI.getMessagesOfRoom(_id);

            return roomMessages;
        },
        users: async (_, __, context) => {
            const { users } = await context.dataSources.userAPI.getUsers();
            return users;
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
            // console.log(response);

            if (!response?.user) {
                throw new GraphQLError('Not Authorized');
            }

            const { user } = await dataSources.userAPI.getUser(response.user);

            return user;

        },
    },
    // Message: {
    //     room: (_, parent) => {
    //         console.log(parent);
    //         const found = rooms.filter((room) => room._id === parent.room);
    //         return found;
    //         return null;
    //     }
    // },
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

            const signup = dataSources.authAPI.signup(username, password);
            const userInfo = dataSources.userAPI.createUser(username, firstName, lastName, email, avatar);

            try {
                const [userRes, authRes] = await Promise.all([userInfo, signup]);

                if (userRes.error || authRes.error) {
                    return { success: false, errorMessage: userRes.error ? userRes.error : authRes.error }
                }

                return { success: true, errorMessage: null };
            } catch (err) {
                return { success: false, errorMessage: err.message };
            }
        },
        login: async (parent, { userInput }, { dataSources, req, res }) => {
            const authRes = dataSources.authAPI.login(userInput);
            const userRes = dataSources.userAPI.getUser(userInput);
            try {
                const [auth, user] = await Promise.all([authRes, userRes]);

                const { token } = auth;
                //TODO: Search about sameSite (:
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
                throw new GraphQLError(message.error ? message.error : message);
            }
        },
        createMessage: async (parent, { messageInput }, context) => {
            pubSub.publish("MESSAGE_CREATED", {
                newMessage: messageInput,
            });

            try {
                const createdMessage = await context.dataSources.chatAPI.createMessage(messageInput);

                return createdMessage.message;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },
        createRoom: async (parent, { roomInput }, context) => {
            pubSub.publish("ROOM_CREATED", {
                newRoom: roomInput,
            });

            const { creator } = roomInput;

            try {
                const createdRoom = await context.dataSources.chatAPI.createRoom(roomInput);

                return createdRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },

        addMember: async (parent, { roomInput }, context) => {

            const { _id, members } = roomInput;
            let updatedContact;

            const updatedRoom = await context.dataSources.chatAPI.addMember(_id, members);

            const { name, members: updatedMembers } = updatedRoom;

            const updatedUsers = updatedMembers.map(async ({ username }) => {
                updatedContact = await context.dataSources.userAPI.updateInfo(username, { rooms: { _id, name } });
                return updatedContact;
            });

            return updatedRoom;

        },

        addFriend: async (parent, { friendInput }, context) => {
            try {
                const { updatedUserA, updatedUserB } = await context.dataSources.userAPI.addFriend(friendInput);
                pubSub.publish("FRIEND_REQUEST", {
                    addFriend: updatedUserA,
                });

                const members = [{ username: updatedUserA.username }, { username: updatedUserB.username }];

                const roomInput = {
                    creator: {
                        username: updatedUserA.username
                    },
                    groupalRoom: false,
                    name: `${updatedUserA.username} and ${updatedUserB.username} conversation`,
                    members: members,
                };

                const { _id, name } = await context.dataSources.chatAPI.createRoom(roomInput);

                const updatedUsers = members.map(async ({ username }) => {
                    return await context.dataSources.userAPI.updateInfo(username, { rooms: { _id, name } });
                    // return updatedContact;
                });

                const values = await Promise.all(updatedUsers);

                return { success: true, messageError: null, value: values[0] };
            } catch (err) {
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }

        },

        deleteFriend: async (parent, { friendInput }, { dataSources }) => {
            //TODO Erase messages once a contact is deleted!
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

                return { success: true, errorMessage: null, value: updatedUser };
            } catch (err) {
                console.log('fails');
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }
        }
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
        },

    }
};

module.exports = resolvers;