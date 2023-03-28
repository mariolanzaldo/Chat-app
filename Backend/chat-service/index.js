const express = require('express');
const expressWinston = require('express-winston');
const messageRouter = require('./src/routes/messageRouter');
const roomRouter = require('./src/routes/roomRouter');
const logger = require('./logger');

require("dotenv").config();
require('./src/db/db');


const app = express();
const port = process.env.PORT || 5000;

app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

app.use(express.json());

app.use("/api/chat/message", messageRouter);
app.use("/api/chat/room", roomRouter);

app.listen(port, () => {
    console.log(`Server started on Port ${port}`)
});