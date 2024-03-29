const express = require('express');
const router = express.Router();

router.post(
    '/profile',
    (req, res) => {
        res.json({
            message: 'Authenticated',
            user: req.user,
            token: req.query.secret_token
        });
    }
);

module.exports = router;