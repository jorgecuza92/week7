const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

const tripsRouter = require('./routes/trips')
const indexRouter = require('./routes/index')
//console.log(tripsRouter)

// available in all routes 
global.trips = [
    { name: "Denver", tripId: 1 },
    { name: "Houston", tripId: 2 },
    { name: "Austin", tripId: 3 }
]

const Cat = require('./models/cat')
let cat = new Cat() 

const PORT = 3000

// Everything inside the css folder is available at the root of the app 
// localhost:3000 (Root Level)
// localhost:3000/trip-styles.css
//app.use(express.static("css"))

// localhost:3000/css/trip-styles.css
app.use("/css",express.static("css"))

app.use(express.urlencoded())



app.use("/", indexRouter)
// localhost:3000/trips 
// localhost:3000/trips/1
// localhost:3000/trips/add-trip 
// localhost:3000/trips/update-trip 
 // any route begining with trips will be forward/routed to tripsRouter
app.use("/trips", tripsRouter)

// localhost:3000/users 
// localhost:3000/users/123
//app.use("/users", usersRouter)

// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
    // the pages are located in views directory
app.set('views', './views')
    // extension will be .mustache
app.set('view engine', 'mustache')

/*
app.get("/api/trips", (req, res) => {
    res.json(trips)
}) */

/*
app.get("/api/flooded-regions", (req, res) => {
    res.json(floodedRegions)
}) */


app.listen(PORT, () => {
    console.log('Server is running...')
})