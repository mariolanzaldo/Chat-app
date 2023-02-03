require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
// const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

const ChatAPI = require('./datasources/chatAPI');
const UserAPI = require('./datasources/userAPI');
const AuthAPI = require('./datasources/authAPI');
const { GraphQLError } = require('graphql');

const startServer = async () => {
    const app = express();

    const port = process.env.PORT || 5000;


    const httpServer = createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const serverCleanup = useServer({
        schema,
        context: async () => {
            const dataSources = {
                chatAPI: new ChatAPI(),
                userAPI: new UserAPI(),
                authAPI: new AuthAPI(),

            };
            return {
                dataSources,
            }
        },
    }, wsServer);

    const server = new ApolloServer({
        schema,
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
        bodyParser.json(), expressMiddleware(server, {
            context: async ({ req, res }) => {
                const { cache } = server;
                const { JWT } = req.cookies;

                let authUser;

                if (JWT) {

                    authUser = await new AuthAPI().secureRoute(JWT);
                    const { user } = authUser;

                    if (!user) {
                        throw new GraphQLError("Internal Error", {
                            extensions: {
                                code: 'UNAUTHENTICATED',
                                http: { status: 401 },
                            }
                        });
                    }

                    const fromUserService = await new UserAPI().getUser(user);

                    authUser = { ...authUser.user, ...fromUserService.user };
                }

                const dataSources = {
                    chatAPI: new ChatAPI({ cache }),
                    userAPI: new UserAPI({ cache }),
                    authAPI: new AuthAPI({ cache }),

                };
                return {
                    authUser,
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