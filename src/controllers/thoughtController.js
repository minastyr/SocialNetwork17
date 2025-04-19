const Thought = require('../models/Thought');
const User = require('../models/User');

const ThoughtController = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by its ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
            res.status(201).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Update a thought by its ID
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Delete a thought by its ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });
            res.status(200).json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(201).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Delete a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = ThoughtController;