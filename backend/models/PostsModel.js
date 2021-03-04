const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({

    title: { // Title of the post
        type: String,
        unique: false,
        required: true
    },

    description: { // Description of the post
        type: String,
        unique: false,
        required: true
    },

    // User feeling on the post
    feeling: {
        type: String,
        enum: ['Great', 'Good', 'Meh', 'Bad', 'Awful'],
        required: true
    },

    // Post category
    category: {
        type: String,
        enum: ['General', 'Anxiety', 'PTSD', 'Depression', 'Weight loss'],
        required: true
    },

    selfAware: {
        type: Boolean,
        required: true
    }
},

{
    timestamps: true
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;