const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
        username: String!
        firstName: String
        lastName: String
        email: String
        password: String
        confirmPassword: String
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
        #room: [Room] ????
    }

    type Room {
        _id: ID
        name: String
        groupalRoom: Boolean
        members: [String]
    }

    type Res{
        success: Boolean
        errorMessage: String
    }

    type Mutation {
        login(userInput: UserInput): User!
        createUser(userInput: UserInput): Res!
        createMessage(messageInput: MessageInput): Message!
    }

    type Query {
        messages: [Message]
        users: [User]
    }

    type Subscription {
        newMessage: Message
    }
`;

module.exports = typeDefs;