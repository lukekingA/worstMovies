const router = require('express').Router()
let User = require('../models/user')

router.get('', (req, res, next) => {
    User.find({})
        .then(users => {
            res.status(200).send(users)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})



router.get('/:id', (req, res, next) => {
    User.findById(req.params.id).populate('user')
        .then(user => {
            if (user) {
                return res.status(200).send(user)
            }
            res.status(400).send('No User Listed At That ID')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post('', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(201).send(user)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//this route for logging in (this is a POST route but we are not writing to the db but querying for a user)
router.post('/login', (req, res, next) => {
    User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        .then(user => {
            if (!user) {
                return res.status(401).send({
                    message: 'invalid crediantials'
                })
            }
            res.send(user)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

router.put('/:id', (req, res, next) => {
    User.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        })
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.delete('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            return user.remove()
        })
        .then(() => res.status(200).send('Successfully Deleted'))
        .catch(err => {
            res.status(500).send(err)
        })
})


module.exports = router