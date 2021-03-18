const express = require('express')
const router = express.Router()

// localhost:3000/trips
router.get('/', (req,res) => {
  res.render('home', { trips: trips })
})

//localhost:3000/trips/cities/houston
//localhost:3000/trips/cities/austin
//localhost:3000/trips/cities/denver
// router.get('/cities/:city', (req,res) => {
//   const city = req.params.city
//   res.render('city-details', {city : city})
// })

router.get("/:tripId", (req,res) => {

  const tripId = req.params.tripId

  let trip = trips.find((trip) => trip.tripId == tripId)
  console.log(trip)
  res.render('trip-details', trip)
})

// localhost:3000/trips/update-trip
router.post("/update-trip", (req,res) => {

  const tripId = parseInt(req.body.tripId)
  const name = req.body.tripName

  let trip = trips.find((trip) => trip.tripId  == tripId)
  trip.name = name

  res.redirect('/trips')

})


module.exports = router 