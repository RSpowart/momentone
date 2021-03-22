const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Discussion must contain a valid title']
    },

    content: {
        type: String,
        required: [true, 'A discussion must content']
    },

    category: {
        type: String,
        required: [true, 'A discussion must have a valid category'],
        enum: ['Anxiety', 'Burnout', 'PTSD', 'Weight Loss', 'Depression', 'Self Care', 'Eating-Disorder']
    },

    description: { // The description of the discussion
        type: String
    },

    likes: {
        type: Number,
        required: [true, 'Discussion must have likes']
    }
});

const DiscussionModel = mongoose.model('Discussion', discussionSchema); // Creates a discussion model to be exported
module.exports = DiscussionModel; // Export the model