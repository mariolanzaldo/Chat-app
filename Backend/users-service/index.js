const express = require('express');
const userRoutes = require('./routes/serviceRoutes');
require("dotenv").config();
require('./db/db');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err });
})

app.listen(port, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
});