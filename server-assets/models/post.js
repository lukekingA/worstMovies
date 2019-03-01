let mongoose = require('mongoose')
let Comment = require('./comment')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let post = new Schema({
    imgUrl: { type: String, required: true },
    upvote: { type: Number, required: true, default: 0 },
    downvote: { type: Number, required: true, default: 0 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true }
}, {
        timestamps: true
    })

//987r9touyf8645yuy0puh


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