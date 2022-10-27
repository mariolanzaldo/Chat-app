const { gql } = require("apollo-server-express");

// const typeDefs = gql`
//     type Book {
//         title: String
//         authors: [Author]
//     }

//     type Author {
//         name: String!
//         age: Int
//     }

//     type Query {
//         books: [Book]
//     }
// `;

const typeDefs = gql`
    type User {
        id: ID
        username: String!
        # email: String!
        # password: String
        # contactList:[Contact]
        rooms: [Room]
    }

    type Contact {
        id: ID
        username: String!
         email: String!
    }

    type Room {
        id: ID
        name: String!
        groupalRoom: Boolean
        members: [String]
    } 

    type Query {
        users: [User]
    }
`;

// messages: [Message]

/*type Message {
      id: ID
      body: String!
      sendBy: User
      room: Room
      user: User
  }*/

module.exports = typeDefs;