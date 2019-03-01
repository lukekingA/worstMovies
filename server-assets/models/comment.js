let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let subcomment = new Schema({
    upvote: { type: Number, required: true, default: 0 },
    downvote: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true }
})

let comment = new Schema({
    upvote: { type: Number, required: true, default: 0 },
    downvote: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
    subcomments: [subcomment]
})


module.exports = mongoose.model('Comment', comment)