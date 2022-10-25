const express = require("express");
const messageModel = require("../model/messageModel");

const router = express.Router();

router.post('/createMessage', async (req, res) => {
    try {
        const { body } = req;
        const message = await messageModel.create(body);

        return res.status(201).send({ message });
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const message = await messageModel.findById({ _id });

        if (!message) return res.status(404).send('Message not Found');

        return res.status(200).send(message);
    } catch (err) {

    }
});

router.delete('/deleteMessage/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const message = await messageModel.findById({ _id });

        if (!message) {
            return res.status(404).send({ message: 'Message not found' });
        }

        message.deleteOne();

        return res.status(200).send(message);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;