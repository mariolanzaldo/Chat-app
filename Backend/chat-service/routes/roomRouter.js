const express = require("express");
const roomModel = require("../model/roomModel");

const router = express.Router();

router.post('/createRoom', async (req, res) => {
    const group = { ...req.body };
    try {
        roomModel.collection.dropIndexes();

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

        // if (!room.groupalRoom) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

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

        if (!room.groupalRoom && room.members.length > 0 && req.body.length > 1) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        if (!room.groupalRoom && room.members.length === 0 && req.body.length > 2) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        const updatedRoom = await roomModel.findByIdAndUpdate(
            { _id: room._id, },
            { $push: { members: req.body } },
            { upsert: true, new: true }
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

        const roomArray = await req.body.map(async (member) => {
            const updatedRoom = await roomModel.findByIdAndUpdate(
                { _id: room._id, },
                { $pull: { members: member } },
                { upsert: true, new: true }
            );

            return updatedRoom;
        });

        const updatedRoom = await roomModel.findById({ _id });
        return res.status(200).send(updatedRoom);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch('/addAdmin/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });

        if (!room) return res.status(404).send({ error: 'Room not found' });

        if (!room.groupalRoom) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        const roomArray = await req.body.map(async (user) => {
            const updatedRoom = await roomModel.findByIdAndUpdate(
                { _id: room._id, },
                { $push: { admin: user } },
                { upsert: true, new: true }
            );

            return updatedRoom;
        });

        const updatedRoom = await roomModel.findById({ _id });

        return res.status(201).send(updatedRoom);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch('/deleteAdmin/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });

        if (!room) return res.status(404).send({ error: 'Room not found' });

        if (!room.groupalRoom) return res.status(405).send({ error: 'Not allowed in one to one conversations' });

        const roomArray = await req.body.map(async (user) => {
            const updatedRoom = await roomModel.findByIdAndUpdate(
                { _id: room._id, },
                { $pull: { admin: user } },
                { upsert: true, new: true }
            );

            return updatedRoom;
        });

        const updatedRoom = await roomModel.findById({ _id });

        return res.status(201).send(updatedRoom);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = router;
