
const express = require('express')
const router = express.Router()

// localhost:3000/trips
router.get("/", (req, res) => {
    res.render("index", { trips: trips })
})

// localhost:3000/trips/cities/houston
// localhost:3000/trips/cities/austin
// localhost:3000/trips/cities/boston
router.get("/cities/:city", (req, res) => {
    const city = req.params.city 
    res.render("city-details", { city: city })
})


// localhost:3000/trips/12 
router.get("/:tripId", (req, res) => {

    const tripId = req.params.tripId

    // find functions returns a single object based on the condition 
    let trip = trips.find((trip) => trip.tripId == tripId)
    console.log(trip)
    res.render("trip-details", trip)

})

// localhost:3000/trips/update-trip 
router.post("/update-trip", (req, res) => {

    const tripId = parseInt(req.body.tripId)
    const name = req.body.tripName

    // get the trip based on the tripId
    let trip = trips.find((trip) => trip.tripId == tripId)
    trip.name = name

    res.redirect("/trips")
})


// localhost:3000/trips/add-trip 
router.post("/add-trip", (req, res) => {

    let name = req.body.tripName
    let trip = { name: name, tripId: trips.length + 1 }
    trips.push(trip)

    res.redirect("/trips")
})

module.exports = router // now other files can import router 



