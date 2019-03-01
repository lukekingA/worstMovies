let mongoose = require('mongoose')
let Comment = require('./comment')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let post = new Schema({
    imgUrl: { type: String, required: true },
    upvote: { type: Number, required: true, default: 0 },
    downvote: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    comment: { type: ObjectId, ref: 'Comment', required: true, default: 'Be The First To Comment!' },
    username: { type: ObjectId, ref: 'User', required: true },
})


post.pre('remove', next => {
    Comment.find({ post: this._id })
        .then((comments) => {
            console.log('deleting comments')
            comments.forEach(c => c.remove())
            next()
        })
        .catch(err => next(err))
})

module.exports = mongoose.model('Post', post)