const { RESTDataSource } = require('@apollo/datasource-rest');

class UserAPI extends RESTDataSource {
    baseURL = 'http://localhost:5500';

    constructor(options = {}) {
        super(options);
        // this.token = options.token;
        this.memoizeGetRequests;
    }

    async createUser(username, firstName, lastName, email, avatar) {
        return this.post(
            `/api/users/`,
            {
                body: {
                    username,
                    firstName,
                    lastName,
                    email,
                    avatar,
                }
            }
        );

    };

    async getUser(userInput) {
        return this.get(`/api/users/getUser/${userInput.username}`);
    };

    async getUsers() {
        return this.get(`api/users/getUsers`);
    };

    async updateInfo(username, infoToupdate) {
        return this.patch(
            `/api/users/update/${username}`,
            { body: infoToupdate },
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
