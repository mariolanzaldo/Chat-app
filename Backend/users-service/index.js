const express = require('express');
const userRoutes = require('./routes/serviceRoutes');
require("dotenv").config();
require('./db/db');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server started on Port ${port}`);
});