const express = require("express");
const roomModel = require("../model/roomModel");

const router = express.Router();


router.post('/createRoom', async (req, res) => {
    const group = { ...req.body };
    try {
        const room = await roomModel.create(group);

        return res.status(201).send(room);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.patch('/addMember/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const room = await roomModel.findById({ _id });

        if (!room.groupalRoom) return res.status(405).send({ message: 'Not allowed in one to one conversations' });

        if (!room) return res.status(404).send({ message: 'Room not found' });

        const updatedRoom = await roomModel.findByIdAndUpdate(
            { _id: room._id, },
            { $push: { members: req.body.newUser } },
            { upsert: true }
        );

        console.log(req.body.newUser)

        return res.status(200).send(room);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
