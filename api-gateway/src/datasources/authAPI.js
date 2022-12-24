const { RESTDataSource } = require('@apollo/datasource-rest');

class AuthAPI extends RESTDataSource {
    baseURL = process.env.API_AUTH;

    constructor(options = {}) {
        super(options);
        // this.token = options.token;
        this.memoizeGetRequests;
    }

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
    async secureRoute(token) {
        return this.post(
            `api/auth/profile`,
            {
                body: {
                    secret_token: token
                }
            }
        );
    };

    async login(userInput) {
        return this.post(
            `/api/auth/login`,
            { body: userInput }
        );
    };

}

module.exports = AuthAPI;