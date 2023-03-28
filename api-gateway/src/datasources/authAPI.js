const { RESTDataSource } = require('@apollo/datasource-rest');

class AuthAPI extends RESTDataSource {
    baseURL = process.env.API_AUTH;


    constructor(options = {}) {
        super(options);
        // this.token = options.token;
        // this.memoizeGetRequests;
        this.standarURL = 'api/auth';
    }

    async signup(username, password) {
        return this.post(
            `/${this.standarURL}/signup`,
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
            `/${this.standarURL}/profile`,
            {
                body: {
                    secret_token: token
                }
            }
        );
    };

    async login(userInput) {
        return this.post(
            `/${this.standarURL}/login`,
            { body: userInput }
        );
    };

}

module.exports = AuthAPI;