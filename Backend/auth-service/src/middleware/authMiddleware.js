const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../model/authUserModel");
const passportJWT = require('passport-jwt');
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_TOKEN,
            jwtFromRequest: ExtractJWT.fromBodyField('secret_token'),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use("signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, async (username, password, done) => {
    try {
        const user = await UserModel.create({ username, password });
        done(null, user);
    } catch (err) {
        done(err);
    }
}));

passport.use("login", new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false, { error: 'The user or password is incorrect', status: 404 });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { error: 'The user or password is incorrect', status: 404 });
            }

            return done(null, user, { message: 'Logged in Successfully' });
        } catch (err) {

        }
    }
))

