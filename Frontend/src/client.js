import { ApolloClient, InMemoryCache } from '@apollo/client';

const URL = "http://localhost:2500/graphql";
const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});

export default client;