require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const { parse } = require('cookie-parse');
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
        context: async (ctx) => {
            const { cache } = server;

            const { JWT } = parse(ctx.extra.request.headers.cookie);

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
                dataSources,
                authUser,
            }
        },
    }, wsServer);

    const server = new ApolloServer({
        schema,
        //TODO: To disable the apollo sandbox
        introspection: process.env.NODE_ENV !== 'production',
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
                    hasAuth: JWT ? null : new GraphQLError("Internal Error", {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: { status: 401 },
                        }
                    }),
                }
            },
        }));

    httpServer.listen(port, () => {
        console.log(`Server ready at ${port}`);
    })
};

module.exports = startServer;