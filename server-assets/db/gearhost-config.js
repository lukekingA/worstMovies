let mongoose = require('mongoose')
let connectionStr = "mongodb://worstmovieever:movie!@den1.mongo1.gear.host:27001/worstmovieever"
let connection = mongoose.connection

mongoose.connect(connectionStr, { useNewUrlParser: true })

connection.on('error', err => console.log('DB ERROR:', err))

connection.once('open', () => console.log('connected to the database!'))