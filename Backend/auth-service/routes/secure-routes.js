const express = require('express');
const router = express.Router();

router.get(
    '/dashboard',
    (req, res, next) => {
        res.json({
            message: 'This is a secure route',
            user: req.user,
            token: req.query.secret_token
        });
    }
);

module.exports = router;