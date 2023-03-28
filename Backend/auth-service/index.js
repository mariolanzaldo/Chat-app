const express = require("express");
const passport = require('passport');
const authRoutes = require("./src/routes/authRoutes");
const secureRoute = require('./src/routes/secure-routes');
// const rateLimit = require('express-rate-limit');
const expressWinston = require("express-winston");
const logger = require("./logger");
require('./src/middleware/authMiddleware');
require('./src/db/db');
require("dotenv").config();

const app = express();
// const loginLimiter = rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 5,
//     message: 'Too many requests from this IP',
//     standarHeaders: true,
//     legacyHeaders: false,
// });

// app.use(loginLimiter);
app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/auth', passport.authenticate('jwt', { session: false }), secureRoute);

app.use(function (err, _, res, __) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
});