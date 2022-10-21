const express = require('express');
const mongoose = require('mongoose');
const userServiceModel = require('../model/userServiceModel');
const { findOne } = require('../model/userServiceModel');
const UserModel = require('../model/userServiceModel');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const user = await UserModel.findById({ _id });

        if (!user) return next({ message: 'User not Found!' });
        return res.status(200).send({ user });
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req, res) => {
    if (!req.body) {
        return next(new Error('Invalid body'));
    }
    try {
        const { username, email } = req.body;
        const newUser = await UserModel.create({ username, email });
        return res.status(201).send({ newUser });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

router.patch('/addFriend', async (req, res, next) => {
    try {

        const { id: idA } = req.body.userA;
        const { id: idB } = req.body.userB;

        const userA = await findUser(req.body.userA);
        const userB = await findUser(req.body.userB); //TODO: refactor to use promise all instead two calls.

        console.log(userA);

        // const updatedUserA = await userServiceModel.findByIdAndUpdate(
        //     { _id: idA, },
        //     { $push: { contactList: idB } },
        //     { upsert: true }
        // );

        // const udaptedUserB = await userServiceModel.findByIdAndUpdate(
        //     { _id: idB, },
        //     { $push: { contactList: idB } },
        //     { upsert: true }
        // );

        // updatedUserA, udaptedUserB

        // if (!userA || !userB) return next({ message: 'Something went wrong!' });

        return res.status(200).send({ message: 'succeed' });
    } catch (err) {
        next(err);
    }
});

router.patch('/deleteFriend', async (req, res, next) => {
    try {

        const { id: idA } = req.body.userA;
        const { id: idB } = req.body.userB;

        const userA = await userServiceModel.findByIdAndUpdate(
            { _id: idA, },
            { $pull: { contactList: idB } },
        );

        const userB = await userServiceModel.findByIdAndUpdate(
            { _id: idB, },
            { $pull: { contactList: idB } },
        );

        if (!userA || !userB) return next({ message: 'Something went wrong!' });

        return res.status(200).send({ userA, userB });
    } catch (err) {
        next(err);
    }
});

async function findUser(user) {
    const found = await userServiceModel.findOne({ email: user.email, username: user.username });
    console.log(found);

    if (!found) return null;

    return found;
}

module.exports = router;