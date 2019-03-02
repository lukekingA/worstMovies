let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Posts = require('./post')
let Comments = require('./comment')



let user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

user.pre('remove', function (next) {
    Promise.all([Comments.remove({
            userId: this._id
        }), Posts.remove({
            userId: this._id
        })])
        .then(() => {
            console.log('deleting posts')
            next()
        })
        .catch(err => next(err))

})

module.exports = mongoose.model('User', user)