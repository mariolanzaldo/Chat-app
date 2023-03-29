const { GraphQLError } = require('graphql');


const queryResolvers = {
    messages: async (_, { _id }, { dataSources, authUser, hasAuth }) => {

        if (hasAuth) throw hasAuth;

        let isMember;

        if (authUser) {
            const { members } = await dataSources.chatAPI.getRoom(_id);

            isMember = members.find((user) => user.username === authUser.username);
        }

        if (!isMember) {
            throw new GraphQLError("Internal Error", {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            });
        }

        if (isMember) {
            const roomMessages = await dataSources.chatAPI.getMessagesOfRoom(_id);

            return roomMessages;
        }
    },
    currentUser: async (_, __, { dataSources, authUser, hasAuth }) => {
        if (hasAuth) throw hasAuth;

        const roomsArray = authUser.rooms.map(async (room) => {
            const newRoom = await dataSources.chatAPI.getRoom(room._id);

            if (newRoom) {
                room = newRoom;
            }
            return room;
        });

        const completeRooms = await Promise.all(roomsArray);
        authUser.rooms = completeRooms;

        return authUser;
    },
    existence: async (_, input, { dataSources }) => {
        const { username, email } = input;

        if (username) {
            const isExistent = await dataSources.userAPI.fieldExistence({ username });

            return { username: isExistent.exists };
        } else if (email) {
            const isExistent = await dataSources.userAPI.fieldExistence({ email });

            return { email: isExistent.exists };
        }
    },
};

module.exports = queryResolvers;