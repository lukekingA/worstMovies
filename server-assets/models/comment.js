let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let subcomment = new Schema({
    upvote: { type: Number, required: true, default: 0 },
    downvote: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    postId: { type: ObjectId, ref: "Post", required: true },
    user: { type: ObjectId, ref: "User", required: true },
}, {
        timestamps: true
    })

let comment = new Schema({
    upvote: { type: Number, required: true, default: 0 },
    downvote: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    postId: { type: ObjectId, ref: "Post", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    subcomments: [subcomment]
}, {
        timestamps: true
    })


module.exports = mongoose.model('Comment', comment)