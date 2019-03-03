let mongoose = require('mongoose')
let Comment = require('./comment')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let post = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        required: true,
        default: 0
    },
    downvote: {
        type: Number,
        required: true,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})




post.pre('remove', function () {
    Comment.find({
            postId: this._id
        })
        .then((comments) => {
            console.log('deleting comments')
            return Promise.all(comments.map(c => c.remove()))
        })
        .then(() => next())
        .catch(err => next(err))
})

module.exports = mongoose.model('Post', post)