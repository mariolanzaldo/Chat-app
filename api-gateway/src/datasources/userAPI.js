const { RESTDataSource } = require('@apollo/datasource-rest');

class UserAPI extends RESTDataSource {
    baseURL = 'http://localhost:5500';

    constructor(options) {
        super(options);
        this.token = options.token;
        this.memoizeGetRequests;
    }

    async createUser(username, firstName, lastName, email) {
        return this.post(
            `/api/users/`,
            {
                body: {
                    username,
                    firstName,
                    lastName,
                    email,
                }
            }
        );

    };

    async getUser(userInput) {
        return this.get(`/api/users/${userInput.username}`);
    };

    async updateInfo(username, createdRoom) {
        return this.patch(
            `/api/users/update/${username}`,
            { body: createdRoom },
        );
    };

    async addFriend(friendInput) {
        return this.patch(
            `/api/users/addFriend`,
            { body: friendInput },
        );
    };

    async deleteFriend(friendInput) {
        return this.patch(
            `/api/users/deleteFriend`,
            { body: friendInput },
        );
    };
}

module.exports = UserAPI;
