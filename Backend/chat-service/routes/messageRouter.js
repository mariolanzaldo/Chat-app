const express = require("express");
const messageModel = require("../model/messageModel");

const router = express.Router();

router.post('/createMessage', async (req, res) => {
    try {
        const message = await messageModel.create(req.body);
        return res.status(201).send(message);
    } catch (err) {
        return res.status(500).send({ message: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const message = await messageModel.findById({ _id });

        if (!message) return res.status(404).send('Message not Found');

    } catch (err) {

    }
});

module.exports = router;