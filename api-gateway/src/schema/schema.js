const { gql } = require("apollo-server-express");

const typeDefs = gql`

    scalar Date

    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        password: String
        confirmPassword: String
        contactList: [ID]
        rooms: [Room]
        #rooms: [ID]
        token: String
    }

    input UserInput {
        username: String
        firstName: String
        lastName: String
        email: String
        password: String
        confirmPassword: String
        joinedAt: Date
    }

    input FriendInput {
        userA: [UserInput]
        userB: [UserInput]
    }

    type Message {
        _id: ID
        content: String
        sendBy: String
        room: ID
    }

    input MessageInput {
        content: String
        sendBy: String
        roomId: ID
        #room: [Room] ????
    }

    type Member {
        username: String
        joinedAt: Date
    }

    type Room {
        _id: ID
        name: String
        creator: User
        groupalRoom: Boolean
        members: [Member]
    }

    input RoomInput {
        name: String
        groupalRoom: Boolean
        creator: UserInput
        members: [UserInput]
        #addMember: [UserInput]
    }

    type Res{
        success: Boolean
        errorMessage: String
    }

    type Mutation {
        #User info and login
        login(userInput: UserInput): User!
        createUser(userInput: UserInput): Res!
        addFriend(friendInput: FriendInput): Res!
        deleteFriend(friendInput: FriendInput ): Res!

        #Messages and rooms
        createMessage(messageInput: MessageInput): Message!
        createRoom(roomInput: RoomInput): Room!
        addMember(roomInput: RoomInput): Room!

    }

    type Query {
        messages: [Message]
        users: [User]
    }

    type Subscription {
        newMessage: Message
        newRoom: Room
        addFriend: User
    }
`;

module.exports = typeDefs;