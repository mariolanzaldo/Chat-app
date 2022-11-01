const express = require('express');
// const { GraphQLError } = require('graphql');
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
    Mutation: {
        createUser: async (parent, { userInput }, context) => {
            const {
                username,
                firstName,
                lastName,
                password,
                // confirmPassword,
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
                    password,
                })
            });
            try {
                // const userServiceResponse = await responseAuth.json();
                // console.log(userServiceResponse);
                const [authRes, userRes] = await Promise.all([userFetch, authFetch]);
                // const auth = await authRes.json();
                // const user = await userRes.json();

                console.log(authRes);
                return { success: true, errorMessage: null };
            } catch (err) {
                return { success: false, errorMessage: error.message };
            }
        },
        // createMessage: async (parent, { messageInput }, context) => {
        //     pubSub.publish("MESSAGE_CREATED", {
        //         messageCreated: messageInput,
        //     });

        //     return messageInput;
        // }
    },
};

module.exports = resolvers;