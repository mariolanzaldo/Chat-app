const AuthUser = require("../model/authUserModel");
const passport = require('passport');
const express = require("express");
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post(
    "/signup",
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        res.status(201).json({
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
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');

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

// router.post("/signup", async (req, res) => {
//     const { username, password } = req.body;
//     const user = new AuthUser({
//         username,
//         password
//     });
//     try {
//         await user.save();
//         return res.status(201).send(user);
//     } catch (err) {
//         return res.status(500).send({
//             message: `Something wrong occurred ${err}`,
//         });
//     }
// });

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await AuthUser.findOne({ username });
//         if (!user) {
//             return res.status(404).send({ message: "Username or password are incorrect" });
//         }

//         const valid = await user.isValidPassword(password);

//         if (!valid) {
//             return res.status(404).send({ message: "Username or password are incorrect" });
//         }

//         return res.status(200).send({
//             data: {
//                 ok: true,
//             }
//         });

//     } catch (err) {
//         return res.status(500).send({ message: "Server error" });
//     }
// });

module.exports = router;