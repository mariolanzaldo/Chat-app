const queryResolvers = require('./query');
const mutationResolvers = require('./mutation');
const fieldResolvers = require('./fieldResolvers');
const subscriptionResolvers = require('./subs');

const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    Subscription: subscriptionResolvers,
    ...fieldResolvers,
};

module.exports = resolvers;