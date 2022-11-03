const express = require("express");
const roomModel = require("../model/roomModel");

const router = express.Router();

router.post('/createRoom', async (req, res) => {
    const group = { ...req.body };
    try {
        const room = await roomModel.create(group);

        return res.status(201).send(room);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.delete('/deleteRoom/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });

        if (!room) return res.status(404).send({ error: 'Room not found' });

        if (!room.groupalRoom) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        room.deleteOne();

        return res.status(200).send(room);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });

        if (!room) return res.status(404).send({ error: 'Room not found' });

        return res.status(200).send(room);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch('/addMember/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });

        if (!room) return res.status(404).send({ error: 'Room not found' });

        if (!room.members.length >= 3) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        const updatedRoom = await roomModel.findByIdAndUpdate(
            { _id: room._id, },
            { $push: { members: req.body.user } },
            { upsert: true }
        );

        return res.status(201).send(updatedRoom);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch('/deleteMember/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });


        if (!room) return res.status(404).send({ error: 'Room not found' });

        if (!room.groupalRoom) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        const updatedRoom = await roomModel.findByIdAndUpdate(
            { _id: room._id, },
            { $pull: { members: req.body.user } },
            { upsert: true }
        );

        return res.status(200).send(updatedRoom);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = router;
