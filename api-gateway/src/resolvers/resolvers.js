const express = require('express');
const { GraphQLError, GraphQLScalarType, Kind, PossibleFragmentSpreadsRule } = require('graphql');
const { PubSub } = require('graphql-subscriptions');

const router = express.Router();

//User Service
const users = [{
    _id: 1,
    username: 'Mario',
    firstName: 'Mario',
    lastName: 'Laureano',
    email: 'example@mail.com',
    contactList: ['Jack', 'Chris'],
    rooms: [1, 2],
},
{
    _id: 2,
    username: 'Chris',
    firstName: 'Chris',
    lastName: 'Hessler',
    email: 'anotherexample@mail.com',
    contactList: ['Mario', 'Jack', 'Arya'],
    rooms: [1, 3],
},
{
    _id: 3,
    username: 'Jack',
    firstName: 'Jack',
    lastName: 'McGraw',
    email: 'mail@mail.com',
    contactList: ['Mario', 'Chris', 'Arya'],
    rooms: [2, 3],
},
{
    _id: 4,
    username: 'Arya',
    firstName: 'Arya',
    lastName: 'Stark',
    email: 'stark@mail.com',
    contactList: ['Jack', 'Mario', 'Chris'],
    rooms: [3],
}
];

//Chat Service
const rooms = [
    {
        _id: 1,
        name: 'Room1',
        groupalRoom: false,
        members: ['Mario', 'Jack']
    },
    {
        _id: 2,
        name: 'Room2',
        groupalRoom: false,
        members: ['Mario', 'Jack']
    },
    {
        _id: 3,
        name: 'GroupRoom',
        groupalRoom: true,
        members: ['Arya', 'Chris', 'Jack']
    },
];

const messages = [
    {
        _id: 1,
        content: 'Hello Jack',
        sendBy: 'Mario',
        room: 2
    },
    {
        _id: 2,
        content: 'Greetings!',
        sendBy: 'Chris',
        room: 3
    },
];

const pubSub = new PubSub();

const resolvers = {
    Query: {
        messages: () => messages,
        users: async (_, __, context) => {
            const { users } = await context.dataSources.userAPI.getUsers();
            return users;
        },
    },
    Message: {
        room: (parent) => {
            const found = rooms.filter((room) => room._id === parent.room);
            return found;
        }
    },
    User: {
        rooms: (parent) => {
            const userRooms = parent.rooms;
            let room = [];

            for (let i = 0; i < userRooms.length; i++) {
                room.push(rooms.find((room) => room._id === userRooms[i]));
                /*
                try{
                 const res = await fetch(URL, whatever) // request all rooms
                    const fetchedRooms = res.json();
                room.push(fetchedRooms.find....)

                }catch (err) {

                }
                
                */


            }

            return room;
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
                // context.res.cookie('token', token, {
                //     maxAge: 10000
                // });

                //fetching from REST w/Apollo server
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
                const { _id, name, members } = await context.dataSources.chatAPI.addMember(createdRoom._id, creator);

                const withoutKey = members.map(({ username }) => username);

                const updateUserInfo = await context.dataSources.userAPI.updateInfo(creator.username, { rooms: { _id, name } });

                return createdRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },

        addMember: async (parent, { roomInput }, context) => {

            const { _id, members } = roomInput;
            console.log(_id, members);

            let updatedContact;

            // const currentRoom = await context.dataSources.chatAPI.getRoom(_id);
            const updatedRoom = await context.dataSources.chatAPI.addMember(_id, members);

            const { name, members: updatedMembers } = updatedRoom;

            const updatedUsers = await updatedMembers.map(async ({ username }) => {
                updatedContact = await context.dataSources.userAPI.updateInfo(username, { rooms: { _id, name } });
                console.log(updatedContact)
                return updatedContact;
            });

            return updatedRoom;

        },

        addFriend: async (parent, { friendInput }, context) => {
            try {
                const { updatedUserA } = await context.dataSources.userAPI.addFriend(friendInput);
                pubSub.publish("FRIEND_REQUEST", {
                    addFriend: updatedUserA,
                });

                return { success: true, messageError: null, value: updatedUserA };
            } catch (err) {
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }

        },

        deleteFriend: async (parent, { friendInput }, context) => {
            try {
                const { updatedUserA } = await context.dataSources.userAPI.deleteFriend(friendInput);

                return { success: true, errorMessage: null, value: updatedUserA };
            } catch (err) {
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