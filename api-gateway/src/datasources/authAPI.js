const { RESTDataSource } = require('@apollo/datasource-rest');

class AuthAPI extends RESTDataSource {
    baseURL = "http://localhost:5000";

    async signup(username, password) {
        return this.post(
            `/api/auth/signup`,
            {
                body: {
                    username,
                    password,
                }
            }
        );
    };

    async login(userInput) {
        return this.post(
            `/api/auth/login`,
            { body: userInput }
        );
    }

}

module.exports = AuthAPI;