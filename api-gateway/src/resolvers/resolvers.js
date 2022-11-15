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
        createUser: async (parent, { userInput }, context) => {
            const {
                username,
                firstName,
                lastName,
                password,
                avatar,
                confirmPassword,
                email,
            } = userInput;

            const signup = context.dataSources.authAPI.signup(username, password);
            const userInfo = context.dataSources.userAPI.createUser(username, firstName, lastName, email, avatar);

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
        login: async (parent, { userInput }, context) => {
            const authRes = context.dataSources.authAPI.login(userInput);
            const userRes = context.dataSources.userAPI.getUser(userInput);
            try {
                const [auth, user] = await Promise.all([authRes, userRes]);

                const { token } = auth;

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
                const updateUserInfo = await context.dataSources.userAPI.updateInfo(creator.username, { rooms: createdRoom });

                return createdRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },

        addMember: async (parent, { roomInput }, context) => {
            //TODO: This is not finished!

            const roomResponse = await fetch(`${CHAT_SERVICE}/api/chat/room/6362c0482666a2ec8db87cba`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const room = await roomResponse.json();
            console.log(room);

            // const chatResponse = await fetch(`${CHAT_SERVICE}/api/chat/room/addMember/:id`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //     },
            //     body: JSON.stringify(memberInput),
            // });

            return roomInput;

        },

        addFriend: async (parent, { friendInput }, context) => {

            try {
                const { updatedUserA } = await context.dataSources.userAPI.addFriend(friendInput);
                pubSub.publish("FRIEND_REQUEST", {
                    addFriend: updatedUserA,
                });

                return { success: true, messageError: null };
            } catch (err) {
                const message = err.extensions.response.body.error;
                return { success: false, errorMessage: message };
            }

        },

        deleteFriend: async (parent, { friendInput }, context) => {
            try {
                const deleteFriendResponse = await context.dataSources.userAPI.deleteFriend(friendInput);

                return { success: true, errorMessage: null };
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
        }

    }
};

module.exports = resolvers;