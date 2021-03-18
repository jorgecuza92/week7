const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const app = express()

app.use(express.urlencoded())

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
  {name: 'jorgecuza', age: '28'}
]

app.get('/register', (req,res) => {
  res.render('register')
})

app.post('/register', (req,res) => {

  const name = req.body.name
  const age = req.body.age

  const authenticatedUser = users.find((user) =>{
    return user.name == name && user.age == age
  })

  if(authenticatedUser) {

    if(req.session) {
      req.session.name = name
      req.session.age = age
    }
    res.redirect('/confirm')
  } else {
    res.render("register", {message: "Name or age does not match"})
  }
})


app.get('/confirm', (req,res) => {
  const name = req.session.name // get name form session
  const age = req.session.age // get age from sesion
  res.render('confirm', {name: name, age: age})
})






app.listen(3000,() => {
  console.log('Server is running...')
})