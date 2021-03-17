const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');

// setting up mustache as template engine
app.engine('mustache', mustacheExpress())
// pages are located in the views directory
app.set('views', './views')
// extension for all pages will be mustache
app.set('view engine', 'mustache')

app.use(express.urlencoded()) // for parsing for submitted values 
app.use(express.static('public'))


let trips = []

app.post('/add-trip', (req,res) => {
  const tripImage = req.body.tripImage
  const destination = req.body.destination
  const departure = req.body.departure
  const arrival = req.body.arrival
  
  let trip = {tripImage: tripImage, destination: destination, departure: departure, arrival: arrival, taskId: uuidv4()}
  trips.push(trip)

  res.redirect('/trips')
})

app.post('/delete-task', (req,res) => {
  const taskId = req.body.taskId

  trips = trips.filter((trip) => {
    return trip.taskId != taskId
  })

  res.redirect("/trips")

})

app.get('/add-trip', (req,res) => {
  res.render('add-trip')
})


app.get('/trips', (req,res) => {
  res.render('trips', {allTrips: trips})
})



app.listen(3000, () => {
  console.log('Server is running...')
})