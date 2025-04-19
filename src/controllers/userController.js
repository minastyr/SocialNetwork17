const User = require('../models/User');
const Thought = require('../models/Thought');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
};