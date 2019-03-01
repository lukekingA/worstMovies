const router = require('express').Router()
let Comment = require('../models/comment')

router.get('', (req, res, next) => {
    Comment.find({})
        .then(comments => {
            res.status(200).send(comments)
        })
        .catch(err => {
            res.status(500).send('Error: ', err)
        })
})

router.get('/:id', (req, res, next) => {
    Comment.findById(req.params.id).populate('post')
        .then(comment => {
            if (comment) {
                return res.status(200).send(comment)
            }
            res.status(400).send('No Comments On This Post')
        })
        .catch(err => {
            res.status(500).send('Error: ', err)
        })
})

router.post('', (req, res, next) => {
    Comment.create(req.body)
        .then(comment => {
            res.status(201).send(comment)
        })
        .catch(err => {
            res.status(500).send('Error: ', err)
        })
})

router.put('/:id', (req, res, next) => {
    Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(comment => {
            res.status(200).send(comment)
        })
        .catch(err => {
            res.status(500).send('Error: ', err)
        })
})


router.delete('/:id', (req, res, next) => {
    Comment.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).send('Successfully Deleted')
        })
        .catch(err => {
            res.status(500).send('Error: ', err)
        })
})


module.exports = router