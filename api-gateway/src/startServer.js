const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

require('dotenv').config();

//chats (messages, groups, members, ...)
//user 

const startServer = async () => {
    const app = express();

    const port = process.env.PORT || 5000;

    const server = new ApolloServer({
        resolvers,
        typeDefs,
    });

    await server.start();

    server.applyMiddleware({ app, cors: true, path: '/graphql' });

    app.listen(port, () => {
        console.log(`Server ready at ${port}`);
    })
};

module.exports = startServer;