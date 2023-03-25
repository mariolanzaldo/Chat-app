const express = require('express');
const userServiceModel = require('../model/userServiceModel');
const UserModel = require('../model/userServiceModel');

const router = express.Router();

router.get('/user/:id', async (req, res, next) => {
    const _id = req.params.id;

    try {
        const user = await UserModel.findOne({ username: _id });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        return res.status(200).send({ user });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.post('/user', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: 'Invalid body' });
    }
    try {
        const { username, firstName, lastName, email, avatar } = req.body;
        const newUser = await UserModel.create({ username, firstName, lastName, email, avatar });
        return res.status(201).send({ newUser });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch('/user/:id', async (req, res) => {
    const username = req.params.id;
    const infoToupdate = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) return res.status(404).send({ error: 'User not Found!' });

        for (const key in infoToupdate) {
            if (key === 'rooms' && !Array.isArray(infoToupdate[key])) {
                const isRoomExists = user[key].find((room) => room._id === infoToupdate[key]._id);

                if (isRoomExists) {
                    user[key] = user[key].filter((room) => room._id !== infoToupdate[key]._id);
                } else if (!isRoomExists) {
                    user[key].push(infoToupdate[key]);
                }

            } else if (key === 'rooms' && Array.isArray(infoToupdate[key])) {
                user[key] = infoToupdate[key];
            } else {
                user[key] = infoToupdate[key];
            }
        }
        user.save();
        return res.status(200).send(user);

    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.post("/user/friend", async (req, res) => {
    const { userA, userB } = req.body;
    const query = req.query;

    switch (query.act) {
        case "request":
            try {
                const user = await userServiceModel.findOne({ username: userA.username });

                const friend = await userServiceModel.findOne({ username: userB.username });

                if (!user || !friend) return res.status(404).send({ error: "User not found" });

                if (user.contactList.includes(userB.username)) {
                    return res.status(400).send({ error: "Already friends" });
                }

                if (friend.requests.includes(userA.username)) {
                    return res.status(400).send({ error: "Request already sent" });
                }

                const friendReq = { from: userA.username, to: userB.username };

                await userServiceModel.findOneAndUpdate(
                    { username: userB.username },
                    { $push: { requests: friendReq } },
                    { new: true }
                );

                return res.status(200).send(friendReq);

            } catch (err) {
                return res.status(500).send({ error: err.message });
            } finally {
                break;
            }
        case "accept":
            try {
                const user = await userServiceModel.findOne({ username: userA.username });

                const friend = await userServiceModel.findOne({ username: userB.username });

                if (!user || !friend) return res.status(404).send({ error: "User(s) not found" });

                if (user.contactList.includes(userB.username)) {
                    return res.status(400).send({ error: "Already friends" });
                }

                const updatedUserA = await userServiceModel.findOneAndUpdate(
                    { username: user.username, },
                    {
                        $push: { contactList: friend.username },
                        $pull: { requests: { from: friend.username } }
                    },
                    { upsert: true, new: true }
                );

                const updatedUserB = await userServiceModel.findOneAndUpdate(
                    { username: friend.username, },
                    { $push: { contactList: user.username } },
                    { upsert: true, new: true }
                );

                return res.status(200).send({ updatedUserA, updatedUserB });

            } catch (err) {
                console.log(err);
                return res.status(400).send({ error: err.message });
            } finally {
                break;
            }
    }

});

router.delete('/user/friend', async (req, res, next) => {
    const { userA, userB } = req.body;
    const { act } = req.query;

    switch (act) {
        case "reject":
            try {
                const user = await userServiceModel.findOne({ username: userA.username });

                const friend = await userServiceModel.findOne({ username: userB.username });

                if (!user || !friend) return res.status(404).send({ error: "User not found" });

                const updatedUser = await userServiceModel.findOneAndUpdate(
                    { username: userA.username },
                    { $pull: { requests: { from: userB.username } } },
                    { new: true }
                );

                return res.status(200).send(updatedUser);
            } catch (err) {
                return res.status(500).send({ error: err.message });
            } finally {
                break;
            }
        case 'delete':
            try {
                const values = await Promise.all([findUser(req.body.userA), findUser(req.body.userB)]);
                const userA = values[0];
                const userB = values[1];

                if (!userA || !userB) return res.status(404).send({ error: 'User(s) not found' });

                const updatedUserA = await userServiceModel.findOneAndUpdate(
                    { username: userA.username, },
                    { $pull: { contactList: userB.username } },
                    { upsert: false, new: true, }

                );

                const updatedUserB = await userServiceModel.findOneAndUpdate(
                    { username: userB.username, },
                    { $pull: { contactList: userA.username } },
                    { upsert: false, new: true }

                );

                if (!updatedUserA || !updatedUserB) return next({ error: 'Something went wrong!' });

                return res.status(200).send({ updatedUserA, updatedUserB });
            } catch (err) {
                return res.status(500).send({ error: err.message });
            } finally {
                break;
            }
    }
});

router.get("/fieldExistence", async (req, res) => {
    try {
        const field = await userServiceModel.findOne(req.query);

        if (!field) {
            return res.status(200).send({ exists: false });
        }

        return res.status(200).send({ exists: true });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})

async function findUser(user) {
    const found = await userServiceModel.findOne({ $or: [{ email: user[0].email }, { username: user[0].username }] });

    if (!found) return null;

    return found;
}

module.exports = router;