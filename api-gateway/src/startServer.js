const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
// const { startStandAloneServer } = require('@apollo/server/standalone');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

const ChatAPI = require('./datasources/chatAPI');
const UserAPI = require('./datasources/userAPI');
const AuthAPI = require('./datasources/authAPI');

require('dotenv').config();

const startServer = async () => {
    const app = express();

    const port = process.env.PORT || 5000;


    const httpServer = createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        // dataSources: () => ({
        //     chatAPI: new ChatAPI(),
        // }),
        // context: function () {
        //     const datasource = {
        //         ChatAPI: new ChatAPI({ cache }),
        //     };
        //     return {
        //         datasources
        //     }
        // },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),

            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    app.use('/graphql', cookieParser(),
        cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com', 'http://localhost:3500/graphql'], credentials: true }),
        bodyParser.json(), expressMiddleware(server, {
            context: async ({ req, res }) => {
                const dataSources = {
                    chatAPI: new ChatAPI(),
                    userAPI: new UserAPI(),
                    authAPI: new AuthAPI(),

                };
                return {
                    req,
                    res,
                    dataSources,
                }
            },
        }));

    httpServer.listen(port, () => {
        console.log(`Server ready at ${port}`);
    })
};

module.exports = startServer;