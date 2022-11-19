const express = require('express');
const mongoose = require('mongoose');
const userServiceModel = require('../model/userServiceModel');
const { findOne } = require('../model/userServiceModel');
const UserModel = require('../model/userServiceModel');

const router = express.Router();

router.get('/getUser/:id', async (req, res, next) => {
    const _id = req.params.id;

    try {
        const user = await UserModel.findById({ _id });
        if (!user) {
            return res.status(404).send({ error: 'User not Found' });
        }
        return res.status(200).send({ user });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.get('/getUsers', async (req, res) => {
    try {
        const users = await UserModel.find({});
        return res.status(200).send({ users });

    } catch (err) {
        return res.status.apply(500).send({ error: err.message })
    }
});

router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: 'Invalid body' });
    }
    try {
        const { username, firstName, lastName, email, avatar } = req.body;
        const newUser = await UserModel.create({ _id: username, username, firstName, lastName, email, avatar });
        return res.status(201).send({ newUser });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch('/update/:id', async (req, res) => {
    const _id = req.params.id;
    const infoToupdate = req.body;

    try {
        const user = await UserModel.findById({ _id });

        if (!user) return res.status(404).send({ error: 'User not Found!' });

        for (const key in infoToupdate) {
            user[key] = infoToupdate[key];
        }
        user.save();
        return res.status(200).send(user);

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await UserModel.findById({ _id });

        if (!user) return res.status(404).send({ error: 'User not Found!' });

        user.remove();
        res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
})

router.patch('/addFriend', async (req, res, next) => {
    try {
        const values = await Promise.all([findUser(req.body.userA), findUser(req.body.userB)]);
        const userA = values[0];
        const userB = values[1];

        if (!userA || !userB) return res.status(404).send({ error: 'User(s) not found' });

        if (userA.contactList.includes(userB._id)) return res.status(400).send({ error: 'Already in contact list' });

        const updatedUserA = await userServiceModel.findByIdAndUpdate(
            { _id: userA._id, },
            { $push: { contactList: userB.id } },
            { upsert: true, new: true }
        );

        const updatedUserB = await userServiceModel.findByIdAndUpdate(
            { _id: userB.id, },
            { $push: { contactList: userA._id } },
            { upsert: true, new: true }
        );

        return res.status(200).send({ updatedUserA, updatedUserB });
    } catch (err) {
        return res.status(500).send({ error: err.message });

    }
});

router.patch('/deleteFriend', async (req, res, next) => {
    try {

        const values = await Promise.all([findUser(req.body.userA), findUser(req.body.userB)]);
        const userA = values[0];
        const userB = values[1];

        if (!userA || !userB) return res.status(404).send({ error: 'User(s) not found' });

        const updatedUserA = await userServiceModel.findByIdAndUpdate(
            { _id: userA.id, },
            { $pull: { contactList: userB._id } },
            { upsert: false, new: true, }

        );

        const udaptedUserB = await userServiceModel.findByIdAndUpdate(
            { _id: userB.id, },
            { $pull: { contactList: userA._id } },
            { upsert: false, new: true }

        );

        if (!updatedUserA || !udaptedUserB) return next({ error: 'Something went wrong!' });

        return res.status(200).send({ updatedUserA, udaptedUserB });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

async function findUser(user) {
    const found = await userServiceModel.findOne({ $or: [{ email: user[0].email }, { username: user[0].username }] });

    if (!found) return null;

    return found;
}

module.exports = router;