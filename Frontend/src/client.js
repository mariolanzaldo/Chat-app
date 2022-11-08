import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

//Apollo Client now supports subscriptions
const httpLink = new HttpLink({
    uri: 'http://localhost:2500/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:2500/subscriptions',
    //TODO: Authenticate over websocket??? connectionParams: { authToken: user.authToken }
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;