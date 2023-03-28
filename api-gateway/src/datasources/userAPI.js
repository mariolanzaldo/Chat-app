const { RESTDataSource } = require('@apollo/datasource-rest');

class UserAPI extends RESTDataSource {

    baseURL = process.env.API_USERS;

    constructor(options = {}) {
        super(options);
        this.standardURL = 'api/users';
    }

    async createUser(username, firstName, lastName, email, avatar) {
        return this.post(
            `/${this.standardURL}/user`,
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
        const user = userInput.username ? userInput.username : userInput;
        return this.get(`/${this.standardURL}/user/${user}`);
    };

    async updateInfo(username, infoToupdate) {
        return this.patch(
            `/${this.standardURL}/user/${username}`,
            { body: infoToupdate },
        );
    };

    async friendRequest(friendInput) {
        return this.post(
            `/${this.standardURL}/user/friend?act=request`,
            { body: friendInput },
        )
    };

    async acceptFriend(friendInput) {
        return this.post(
            `/${this.standardURL}/user/friend?act=accept`,
            { body: friendInput },
        )
    };

    async rejectFriend(friendInput) {
        return this.delete(
            `/${this.standardURL}/user/friend?act=reject`,
            { body: friendInput },
        )
    };

    async deleteFriend(friendInput) {
        return this.delete(
            `/${this.standardURL}/user/friend?act=delete`,
            { body: friendInput },
        );
    };

    async fieldExistence(params) {
        return this.get(
            `/${this.standardURL}/fieldExistence`, { params });
    }
}

module.exports = UserAPI;
