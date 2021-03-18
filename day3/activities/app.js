const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

const tripsRouter = require('./routes/trips')

global.trips = [
    { name: "Denver", tripId: 1 },
    { name: "Houston", tripId: 2 },
    { name: "Austin", tripId: 3 }
]

app.use(express.urlencoded())

app.use('/trips', tripsRouter)


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')


app.listen(3000, () => {
    console.log('Server is running...')
})
