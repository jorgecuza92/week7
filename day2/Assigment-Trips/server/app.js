const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const authenticate = require('../authentication/auth') // import authentication function
const { v4: uuidv4 } = require('uuid');

// function helloMiddleware(req,res,next) {
//   console.log('Hello Middleware')
//   next() // continue with original request 
// }


// setting up mustache as template engine
app.engine('mustache', mustacheExpress())
// pages are located in the views directory
app.set('views', './views')
// extension for all pages will be mustache
app.set('view engine', 'mustache')

app.use(express.urlencoded()) // for parsing for submitted values 
app.use(express.static('public'))
app.use(session({
  secret: 'THISISSECRETKEY',
  saveUnitialized: true
}))


// app.use(authenticate)
let trips = []

global.users = []



// allow user to register
app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (req.session) {
    req.session.username = username
    req.session.password = password
  }
  // users.push(username) && users.push(password)
  let user = { username: username, password: password }
  users.push(user)

  res.redirect('confirmation')
})

// login page rendering
app.get('/login', (req, res) => {
  res.render('login')

})

app.post('/login', (req, res) => {

  const username = req.body.username
  const password = req.body.password

  const authenticatedUser = users.find((user) => {
    return user.username == username && user.password == password

  })
  //if user login info is correct
  if (authenticatedUser) {

    //check if session is initialized
    if (req.session) {
      req.session.username = username

    }

    res.redirect('/add-trip')

  } else { // if the username or password is incorrect redirect to login again
    res.render('login', { message: 'Incorrect password or username. Please re-enter credentials.' })
  }



})


// confirmation page after user registraiton
app.get('/confirmation', (req, res) => {
  res.render('confirmation', { getUsers: users })
})



// add trip page
app.get('/add-trip',authenticate, (req, res) => {
  res.render('add-trip')
})


app.post('/add-trip', (req, res) => {
  const tripImage = req.body.tripImage
  const destination = req.body.destination
  const departure = req.body.departure
  const arrival = req.body.arrival

  let trip = { tripImage: tripImage, destination: destination, departure: departure, arrival: arrival, taskId: uuidv4() }
  trips.push(trip)

  res.redirect('/trips')
})


// renders page of trips added
app.get('/trips',authenticate, (req, res) => {
  res.render('trips', { allTrips: trips })
})

// deletion
app.post('/delete-task', (req, res) => {
  const taskId = req.body.taskId

  trips = trips.filter((trip) => {
    return trip.taskId != taskId
  })

  res.redirect("/trips")

})



app.listen(3000, () => {
  console.log('Server is running...')
})