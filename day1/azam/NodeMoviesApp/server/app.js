
let movies = [
    {name: "Batman", genre: "Fiction"}, 
    {name: "Finding Nemo", genre: "Kids"}, 
    {name: "Superman", genre: "Fiction"}
]


// importing express into our app so we can run a server 
const express = require('express')
const cors = require('cors')
const app = express() 

app.use(cors()) // CORS enabled on the server 
// Tell express how to parse JSON body 
app.use(express.json()) // MIDDLEWARE 

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.get("/greet", (req, res) => {
    res.send("Hello John!")
})

app.get("/movie", (req, res) => {
    res.json({name: "Batman", year: 2010, director: "John Doe"})
})

// Route Parameters
// /movies/fiction 
// /movies/action 

// http://localhost:3000/movies/fiction
// http://localhost:3000/movies/john
// http://localhost:3000/movies/123

// http://localhost:3000/movies

app.get("/movies/:genre", (req, res) => {
    const genre = req.params.genre 

    const filteredMovies = movies.filter((movie) => {
        return movie.genre.toLowerCase() == genre 
    })

    res.json(filteredMovies)
})

// /movies/action/year/2020
// //movies/fiction/year/1992
app.get("/movies/:genre/year/:year", (req, res) => {
    const genre = req.params.genre 
    const year = req.params.year 
    res.json({genre: genre, year: year})
})

app.get("/movies", (req, res) => {
    res.json(movies)
})

// CREATE A MOVIE 
// name: String 
// genre: String 
app.post("/movies", (req, res) => {

    const name = req.body.name
    const genre = req.body.genre

    const movie = {name: name, genre: genre}
    movies.push(movie)

    res.json({message: "Movie has been added!"})
    //res.send().statusCode(200)
})



/*
app.get("/movies", (req, res) => {
    let movies = [{name: "Batman"}, {name: "Spiderman"}, {name: "Superman"}]
    res.json(movies)
}) */


// start the server 
app.listen(3000, () =>  {
    console.log("Server is running...")
}) 
 