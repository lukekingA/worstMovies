let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Posts = require('./post')
let Comments = require('./comment')
// let ObjectId = Schema.Types.ObjectId


let user = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // posts: { type: ObjectId, ref: "Post", required: false, default: 0 },
    // comments: { type: ObjectId, ref: "Comment", required: false, default: 0 }
})

user.pre('remove', function (next) {
    Promise.all([Posts.remove({ user: this._id }), Comments.remove({ user: this._id })])
        .then(() => {
            console.log('deleting posts')
            next()
        })
        .catch(err => next(err))

})

module.exports = mongoose.model('User', user)