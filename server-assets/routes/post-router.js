const router = require('express').Router()
let Post = require('../models/post')

router.get('', (req, res, next) => {
    Post.find({}).populate({ path: 'userId', select: 'username' })
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})
router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).populate({ path: 'userId', select: 'username' })
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
    Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(post => {
            res.status(200).send(post)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


router.delete('/:id', (req, res, next) => {
    Post.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).send('Successfully Deleted')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


module.exports = router