const express = require("express");
const messageModel = require("../model/messageModel");

const router = express.Router();

router.post('/', async (req, res) => {
    const query = req.query;

    switch (query.act) {
        case "create":
            try {
                const { body } = req;
                const message = await messageModel.create(body);

                return res.status(201).send({ message });
            } catch (err) {
                return res.status(500).send(err.message);
            } finally {
                break;
            }
    }

});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const message = await messageModel.findById({ _id });

        if (!message) return res.status(404).send('Message not Found');

        return res.status(200).send(message);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get('/room/:id', async (req, res) => {
    const { id: roomId } = req.params;

    try {
        const roomMessages = await messageModel.find({ roomId });

        if (!roomMessages) {
            return res.status(404).send("Conversation not Found");
        };

        return res.status(200).send(roomMessages);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.delete('/', async (req, res) => {
    const { act, roomId } = req.query;

    switch (act) {
        case "eraseAll":
            try {
                const deleted = await messageModel.deleteMany({ roomId: roomId });

                return res.status(200).send(deleted)
            } catch (err) {
                return res.status(500).send(err.message);
            } finally {
                break;
            }
        case "erase":
            try {
                const message = await messageModel.findById({ roomId });

                if (!message) {
                    return res.status(404).send({ message: 'Message not found' });
                }

                message.deleteOne();

                return res.status(200).send(message);
            } catch (err) {
                return res.status(500).send(err.message);
            }
            finally {
                break;
            }
    }
});

module.exports = router;