import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const SERVER_URI = "/graphql";
const WS_URL = window.location.protocol === "https:" ? `wss://${window.location.host}/graphql` : `ws://${window.location.host}/graphql`;

//Apollo Client now supports subscriptions
const httpLink = new HttpLink({
    uri: SERVER_URI,
    credentials: 'same-origin',
});

const wsLink = new GraphQLWsLink(createClient({
    url: WS_URL,
    connectionParams: {
        credentials: "same-origin",
    }
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