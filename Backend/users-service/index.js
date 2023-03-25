const express = require('express');
const userRoutes = require('./src/routes/serviceRoutes');
const expressWinston = require('express-winston');
const logger = require('./logger');
require("dotenv").config();
require('./src/db/db');

const app = express();

const port = process.env.PORT || 3000;

app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});