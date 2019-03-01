let express = require('express')
let bp = require('body-parser')
let server = express()
let PORT = 3000

require('./server-assets/db/gearhost-config')

server.use(bp.json())
server.use(bp.urlencoded({
    extended: true
}))

//links www 

//routes
let userRoutes = require('./server-assets/routes/user-router')
let postRoutes = require('./server-assets/routes/post-router')
let commentRoutes = require('./server-assets/routes/comment-router')

server.use('/api/users', userRoutes)
server.use('/api/posts', postRoutes)
server.use('/api/comments', commentRoutes)






server.listen(PORT, () => console.log('port is running on', PORT))