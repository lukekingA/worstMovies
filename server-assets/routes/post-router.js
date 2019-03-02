const router = require('express').Router()
let Comment = require('../models/comment')
let Post = require('../models/post')


router.get('', (req, res, next) => {
    Post.find({}).populate({
            path: 'userId',
            select: 'username'
        })
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).populate({
            path: 'userId',
            select: 'username'
        })
        .then(post => {
            if (post) {
                return res.status(200).send(post)
            }
            res.status(400).send('No Post Listed At That ID')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


router.get('/:id/comments', (req, res, next) => {
    Comment.find({
            postId: req.params.id
        }).populate({
            path: 'userId',
            select: 'username'
        })
        .then(comments => {
            if (comments) {
                return res.status(200).send(comments)
            }
            res.status(400).send('This Post Has No Comments')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


router.post('', (req, res, next) => {
    Post.create(req.body)
        .then(post => {
            res.status(201).send(post)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.put('/:id', (req, res, next) => {
    Post.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        })
        .then(post => {
            res.status(200).send(post)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.delete('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            return post.remove()
        })
        .then(() => res.status(200).send('Successfully Deleted'))
        .catch(err => {
            res.status(500).send(err)
        })
})


module.exports = router