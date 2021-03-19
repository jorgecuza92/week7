
const express = require('express')
const app = express() 
// http is already part of the Node 
const http = require('http').Server(app)
// initialize socket.io object 
const io = require('socket.io')(http)

// Everything inside the js folder is now available at the root level 
// localhost:3000/client.js 
// localhost:3000/js/client.js -- add a js alias 
app.use('/js',express.static('js'))

app.get('/', (req, res) => {
    // path to your project directory 
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})

// connection event is fired when a user 
// loads the page 
io.on('connection', (socket) => {
    console.log('User connected!')

    socket.on('disconnect', () => {
        console.log('User disconnected!')
    })

    // listen on a channel 
    /*
    socket.on('Houston', (message) => {
        io.emit('Houston', message) 
    }) */

    socket.on('Houston', (chat) => {
        io.emit('Houston', chat)
    })

})

http.listen(3000, () => {
    console.log('Server is running...')
})