const { gql } = require("apollo-server-express");

const typeDefs = gql`

    scalar Date

    type UnauthUser {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        avatar: String
        joinedAt: Date
    }

    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        avatar: String
        contactList: [UnauthUser]
        rooms: [Room]
        settings: Settings
        requests: [Request]
        token: String
    }

    input UserInput {
        username: String
        firstName: String
        lastName: String
        email: String
        password: String
        confirmPassword: String
        avatar: String
        joinedAt: Date
    }

    type Settings {
        language: String
    }

    input SettingsInput {
        language: String
    }

    type Request {
        from: UnauthUser!
        to: UnauthUser!
    }

    input FriendInput {
        userB: [UserInput]
        roomId: ID
    }

    type Message {
        _id: ID
        content: String
        isScribble: Boolean
        sendBy: String
        roomId: ID
        createdAt: Date
        updatedAt: Date
    }

    input MessageInput {
        content: String
        isScribble: Boolean
        roomId: ID
    }

    type Room {
        _id: String
        name: String
        admin: [UnauthUser]
        isGroupalRoom: Boolean
        members: [UnauthUser]
        isDeleted: Boolean
    }

    input RoomInput {
        _id: String
        name: String
        isGroupalRoom: Boolean
        admin: [UserInput]
        members: [UserInput]
    }

    input CookieInput {
        name: String
    }

    type Res{
        success: Boolean
        errorMessage: String
        value: User
    }

    type Exists {
        username: Boolean
        email: Boolean
    }

    type Mutation {
        #User info and login
        login(userInput: UserInput): User!
        logout(cookieInput: CookieInput): Res!
        createUser(userInput: UserInput): Res!
        addFriend(friendInput: FriendInput): Request!
        deleteFriend(friendInput: FriendInput): Res!
        acceptFriend(friendInput: FriendInput): Res!
        rejectFriend(friendInput: FriendInput): Res! 
        changeLanguage(settingsInput: SettingsInput): Res!

        #Messages 
        createMessage(messageInput: MessageInput): Message!
        createRoom(roomInput: RoomInput): Room!

        #Rooms
        addMember(roomInput: RoomInput): Room!
        deleteMember(roomInput: RoomInput): Room!
        addAdmin(roomInput: RoomInput): Room!
        deleteAdmin(roomInput: RoomInput): Room!
        leaveGroup(roomInput: RoomInput): Res!
        deleteRoom(roomInput: RoomInput): Res!

    }

    type Query {
        messages(_id: String): [Message]
        currentUser: User
        user(_id: String): User
        existence(username: String, email: String): Exists
    }

    type Subscription {
        newMessage(roomId: ID): Message
        addFriend: Request
        friendRequestAccepted: User
        deleteContact: User
        groupChanged: Room
    }
`;

module.exports = typeDefs;