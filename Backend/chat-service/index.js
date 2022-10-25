const express = require('express');
const messageRouter = require('./routes/messageRouter');
const roomRouter = require('./routes/roomRouter');
require("dotenv").config();
require('./db/db');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/chat/message", messageRouter);
app.use("/api/chat/room", roomRouter);

app.listen(port, () => {
    console.log(`Server started on Port ${port}`)
});