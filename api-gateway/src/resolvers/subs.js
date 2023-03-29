const { withFilter } = require('graphql-subscriptions');
const pubSub = require('./pubsub');

const subscriptionResolvers = {
    newMessage: {
        subscribe: withFilter(() => pubSub.asyncIterator(["MESSAGE_CREATED"]), async ({ newMessage }, _, { dataSources, authUser }) => {
            const room = await dataSources.chatAPI.getRoom(newMessage.roomId);
            const exists = room.members.some((member) => member.username === authUser.username);
            return exists;
        }),
    },
    addFriend: {
        subscribe: withFilter(() => pubSub.asyncIterator(["FRIEND_REQUEST"]),
            ({ addFriend }, _, { authUser }) => {
                const { to } = addFriend;
                const exists = to.username === authUser.username;
                return exists;
            }),
    },
    friendRequestAccepted: {
        subscribe: withFilter(() => pubSub.asyncIterator(["FRIEND_REQUEST_ACCEPTED"]),
            ({ friendRequestAccepted }, _, { authUser }) => {
                const exists = friendRequestAccepted.username === authUser.username;
                return exists;
            }),
    },
    deleteContact: {
        subscribe: withFilter(() => pubSub.asyncIterator([`CONTACT_DELETED`]),
            ({ deleteContact }, _, { authUser }) => {
                const exists = deleteContact.username === authUser.username;
                return exists;
            }
        )
    },
    groupChanged: {
        subscribe: withFilter(() => pubSub.asyncIterator(`GROUP_CHANGED`),
            ({ groupChanged }, _, { authUser }) => {
                const exists = groupChanged.members.some((member) => member.username === authUser.username);
                return exists;
            }),
    }
};

module.exports = subscriptionResolvers;