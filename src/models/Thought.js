const mongoose = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

// Virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;