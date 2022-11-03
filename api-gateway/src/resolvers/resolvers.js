const express = require('express');
const { GraphQLError, GraphQLScalarType, Kind } = require('graphql');
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

const AUTH_SERVICE = "http://localhost:5000";
const USER_SERVICE = "http://localhost:5500";
const CHAT_SERVICE = "http://localhost:4500";

const resolvers = {
    Query: {
        messages: () => messages,
        users: () => users,
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
                confirmPassword,
                email,
            } = userInput;

            const userFetch = fetch(`${USER_SERVICE}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    firstName,
                    lastName,
                    email
                })
            });

            const authFetch = fetch(`${AUTH_SERVICE}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            try {
                const [userRes, authRes] = await Promise.all([userFetch, authFetch]);

                const auth = await authRes.json();
                const user = await userRes.json();

                if (auth.error || user.error) {
                    return { success: false, errorMessage: auth.error ? auth.error : user.error }
                }

                return { success: true, errorMessage: null };
            } catch (err) {
                return { success: false, errorMessage: err.message };
            }
        },
        login: async (parent, { userInput }, context) => {

            const authResponse = await fetch(`${AUTH_SERVICE}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(userInput)
            });

            const { token } = await authResponse.json();

            const userResponse = await fetch(`${USER_SERVICE}/api/users/${userInput.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = await userResponse.json();

            if (data.error) {
                throw new GraphQLError(data.error);
            }

            return { ...data.user, token };
        },

        createMessage: async (parent, { messageInput }, context) => {
            pubSub.publish("MESSAGE_CREATED", {
                newMessage: messageInput,
            });

            const chatResponse = await fetch(`${CHAT_SERVICE}/api/chat/message/createMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(messageInput)
            });

            const data = await chatResponse.json();

            return messageInput;
        },
        createRoom: async (parent, { roomInput }, context) => {
            pubSub.publish("ROOM_CREATED", {
                newRoom: roomInput,
            });

            const { creator } = roomInput;

            const roomResponse = await fetch(`${CHAT_SERVICE}/api/chat/room/createRoom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(roomInput),
            });
            const rooms = await roomResponse.json();
            // const getAdmin = 

            const addAdminResponse = await fetch(`${CHAT_SERVICE}/api/chat/room/addMember/${rooms._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(creator),
            });

            const addRoomToUserResponse = await fetch(`${USER_SERVICE}/api/users/update/${creator.username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ rooms }),
            });

            // const addAmin = await addAdminResponse.json();

            if (rooms.error) {
                throw new GraphQLError(rooms.error);
            } else if (addAdminResponse.error) {
                throw new GraphQLError(rooms.error);
            }

            return rooms;
        },

        addMember: async (parent, { roomInput }, context) => {
            console.log(roomInput);

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
                const userResponse = await fetch(`${USER_SERVICE}/api/users/addFriend`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(friendInput),
                });

                const data = await userResponse.json();

                if (data.error) {
                    return { success: false, errorMessage: data.error };
                }

                return { success: true, errorMessage: null };
            } catch (err) {
                return { success: false, errorMessage: err.message };
            }

        },
    },
    Subscription: {
        newMessage: {
            subscribe: () => {
                pubSub.asyncIterator("MESSAGE_CREATED")
                pubSub.asyncIterator("ROOM_CREATED")
            },
        }
    }
};

module.exports = resolvers;