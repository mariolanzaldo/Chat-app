const express = require("express");
const passport = require('passport');
const authRoutes = require("./routes/authRoutes");
const secureRoute = require('./routes/secure-routes');
const rateLimit = require('express-rate-limit');
require('./auth/auth');
require('./db/db');
require("dotenv").config();

const app = express();

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP',
    standarHeaders: true,
    legacyHeaders: false,
});

app.use(loginLimiter);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
});