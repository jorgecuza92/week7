
let movies =
  [{name: "Batman", genre: "Fiction"}, 
  {name: "Finding Nemo", genre: "Kids"}, 
  {name: "Superman", genre: "Fiction"}]


// importing express into our app so we can run a server 
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
// tell express how to parse JSON body
app.use(express.json()) // MIDDLEWARE

// means localhost: 3000 ("/")
app.get("/", (req,res) => {
  res.send("Hello, World!")
})

app.get("/greet", (req, res) => {
  res.send("Hello Jorge!")
})

// Route Parameters
// /movies/Fiction
// /movies/Anything...
app.get("/movies/:genre", (req,res) => {
  const genre = req.params.genre
  const filteredMovies = movies.filter((movie) => {
    return movie.genre.toLowerCase() == genre
  })
  res.json(filteredMovies)
})


// /movies/action/year/2020
// /movies/fiction/year/2021
app.get("/movies/:genre/year/:year", (req,res) => {
  const genre = req.params.genre
  const year = req.params.year
  res.json({genre: genre, year: year})
})


// CREATE A MOVIE
// name: String
// genre: String
app.post("/movies", (req,res) => {

  const name = req.body.name
  const genre = req.body.genre

  const movie = {name: name, genre: genre}
  movies.push(movie)

  res.json({message: "Movie has been added!"})
  // res.send().statusCode(200)



})


/*
app.get("/movie", (req, res) => {
  res.json({name: "Batman", year: 2010, director: "Christopher Nolan"})
}) */

/*
app.get("/movies/comedy", (req,res) => {
  res.send("Comedy")
})
app.get("/movies/action", (req,res) => {
  res.send("Action")
})
app.get("/movies/fiction", (req,res) => {
  res.send("Fiction")
}) */

/* app.get("/movies", (req,res) => {
  let movies = [{name: "Batman"}, {name: "Spiderman"}, {name:"Superman"}]
  res.json(movies)
}) */

// start the server
app.listen(3000, () => {
  console.log("Server is running...")
}) 

