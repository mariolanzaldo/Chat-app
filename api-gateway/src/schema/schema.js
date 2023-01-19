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
        settings: SettingsInput
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
        userA: [UserInput]
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
        sendBy: String
        roomId: ID
        #room: [Room] ????
    }

    #type Member {
    #    username: String
    #    joinedAt: Date
    #}

    type Room {
        _id: String
        name: String
        admin: [UnauthUser]
        groupalRoom: Boolean
        members: [UnauthUser]
    }

    input RoomInput {
        _id: String
        name: String
        groupalRoom: Boolean
        admin: [UserInput]
        members: [UserInput]
        #addMember: [UserInput]
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
        changeLanguage(userInput: UserInput): Res!

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
        #currentRoom(_id: String): Room
    }

    type Subscription {
        newMessage(roomId: ID): Message
        newRoom: Room
        addFriend: Request
        friendRequestAccepted: User
        deleteContact: User
        groupChanged: [User]
    }
`;

module.exports = typeDefs;