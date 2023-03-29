const { GraphQLScalarType, Kind } = require('graphql');

const fieldResolvers = {
    User: {
        rooms: async (parent, _, { dataSources }) => {
            const completePromiseRooms = await parent.rooms.map(async (room) => {
                const completeRoom = await dataSources.chatAPI.getRoom(room._id);

                return completeRoom;
            });
            const completeRooms = await Promise.all(completePromiseRooms);
            return completeRooms;
        },
        contactList: async (parent, _, { dataSources }) => {
            const response = parent.contactList.map(async (contact) => {
                const { user } = await dataSources.userAPI.getUser({ username: contact });
                const { _id, username, email, firstName, lastName, avatar } = user;
                return { _id, username, email, firstName, lastName, avatar };
            });

            const completeContacts = await Promise.all(response);

            return completeContacts;
        },

    },
    Room: {
        members: async (parent, _, { dataSources }) => {
            const output = parent.members.map(async ({ username, joinedAt }) => {
                const { user } = await dataSources.userAPI.getUser({ username });


                const member = { ...user, joinedAt };
                return member;
            });

            const member = await Promise.all(output);

            return member
        },
        admin: (parent) => {
            const output = parent.admin.map((admin) => admin);

            return output;
        }
    },
    Request: {
        from: async (parent, _, { dataSources }) => {
            const { from: username } = parent;

            const { user } = await dataSources.userAPI.getUser(username);

            return user;
        },
        to: async (parent, _, { dataSources }) => {

            const { to: username } = parent;

            const { user } = await dataSources.userAPI.getUser(username);

            return user;
        }
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        parseLiteral(ast) {
            if (ast.king === Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        }
    }),
};

module.exports = fieldResolvers;