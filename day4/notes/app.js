const express = require('express')
const app = express()
const session = require('express-session')
const mustacheExpress = require('mustache-express')



app.use(express.urlencoded())

// initializing the session
app.use(session({
  secret: 'THISISSECRETKEY',
  saveUnitialized: true 
}))
app.set('views', './views')
app.set('view engine', 'mustache')
app.engine('mustache', mustacheExpress())



let users = [
  {username: 'johndoe', password: 'password'},
  {username: 'marydoe', password: 'password'}
]

app.get('/login', (req, res) => {
  res.render('login')
})

// some kind of form
app.post('/login', (req, res) => {

  const username = req.body.username
  const password = req.body.password
  // if the session is available
  
  const persistedUser = users.find((user) => {
    return user.username == username && user.password == password
  })
  // if the user is not undefined a nd matched the username and password
  if(persistedUser) {
    
    // check if session exists
    if(req.session) {
      req.session.username = username 
    }

    res.redirect('/profile')
  } else { // if username or password incorrect
    res.render("/login", {message: "Username or password is incorrect"})
  }
 
})


app.get('/bank-accounts', (req, res) => {

 res.render('bank-accounts')

  // access users bank accounts
})

app.get('/profile', (req, res) => {

  const username = req.session.username

  res.render('profile', {username: username})
})

app.get('/bank-accounts', (req,res) => {

  if(req.session {
    if(req.session.username) {
      
    }
  })
  res.render('bank-accounts')
})
app.listen(3000, () => {
    console.log('Server is running...')
})
