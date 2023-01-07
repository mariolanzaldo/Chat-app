const AuthUser = require("../model/authUserModel");
const passport = require('passport');
const express = require("express");
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post(
    "/signup",
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        return res.status(201).json({
            message: 'Signup successful',
            user: req.user,
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        return next(info);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (err) => {
                            if (err) return next(err);

                            const body = { id: user._id, username: user.username };
                            const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN); //TODO: Check if this is set correctly, don't forget to uncomment storage class from yml files
                            return res.status(200).json({ token });
                        }
                    )
                } catch (err) {
                    return next(err);
                }
            }
        )(req, res, next);
    }
);

// router.post(
//     '/dashboard', async (req, res) => {
//         const { token } = req.body;
//         jwt.validate();
//     }
// );

module.exports = router;