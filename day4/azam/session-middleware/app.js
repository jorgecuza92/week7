const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const adminRouter = require('./routes/admin')
const authenticate = require('./authentication/auth') // importing authenticate function 
const app = express()

// middleware which prints hello middleware message 
function helloMiddleware(req, res, next) {
    console.log("Hello Middleware")
    next() // continue with the original request 
}

// authentication middleware 
/*
function authenticate(req, res, next) {
    if(req.session) {
        if(req.session.username) {
            next() // proceed to the original request 
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
} */


app.use(express.urlencoded())
// initializing the session 
app.use(session({
    secret: 'THISISSECRETKEY', 
    saveUninitialized: true 
}))

// protecting all the routes which are inside the express router and implemented using router
app.use('/admin',authenticate, adminRouter)

// /users/profile 
// /users/bank-accounts 
//app.use('/users', authenticate, userRouter)

// registering the middleware so the request will have to pass through it 
app.use(helloMiddleware)


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

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register',(req, res) => {
    
    const name = req.body.name 
    const age = req.body.age 

    if(req.session) {
        req.session.name = name 
        req.session.age = age 
        // you can also put objects inside session 
        //req.session.user = {name: name, age: age}
    }

    res.redirect('/confirm')
})

app.get('/confirm', (req, res) => {
    
    const name = req.session.name // get name from the sesion 
    const age = req.session.age 

    res.render('confirm', {name: name, age: age})

})

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

app.get('/profile',authenticate, (req, res) => {
    const username = req.session.username 
    res.render('profile', {username: username})
})

app.get('/bank-accounts',authenticate, (req, res) => {
    res.render('bank-accounts')
})


app.listen(3000,() => {
    console.log('Server is running...')
})