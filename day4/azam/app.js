const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const app = express()

app.use(express.urlencoded())
// initializing the session 
app.use(session({
    secret: 'THISISSECRETKEY', 
    saveUninitialized: true 
}))

// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
    // the pages are located in views directory
app.set('views', './views')
    // extension will be .mustache
app.set('view engine', 'mustache')

let users = [
    {username: 'johndoe', password: 'password'}, 
    {username: 'marydoe', password: 'password'}
]

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {

    const username = req.body.username 
    const password = req.body.password 

    const persistedUser = users.find((user) => {
        return user.username == username && user.password == password
    })

    // if the user is not undefined and matched the username and password 
     // authenticated successfully 
    if(persistedUser) {
        
        // check if the session has been initialized  
        if(req.session) {
            req.session.username = username 
        }

        // return a response from here 
        res.redirect('/profile')

    } else { // if the username or password was incorrect 
        res.render("login", {message: "Username or password is incorrect"})
    }
})

app.get('/bank-accounts', (req, res) => {

    const username = req.session.username


    // access users bank accounts 
})

app.get('/profile', (req, res) => {

    const username = req.session.username 
    res.render('profile', {username: username})
})


app.listen(3000,() => {
    console.log('Server is running...')
})