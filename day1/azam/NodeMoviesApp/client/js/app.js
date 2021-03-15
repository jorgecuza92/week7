
const moviesUL = document.getElementById("moviesUL")
const addMovieButton = document.getElementById("addMovieButton")

addMovieButton.addEventListener("click", function () {

    const name = "Big Short" // coming from a textbox
    const genre = "Business" // coming from a textbox 

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            genre: genre
        })
    }).then(response => response.json())
        .then(result => {
           getAllMovies() 
        })


})


function getAllMovies() {
    // get all movies 
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => {

            const movieItems = movies.map((movie) => {
                return `<li>${movie.name} - ${movie.genre}</li>`
            })

            moviesUL.innerHTML = movieItems.join("")
        })
}

getAllMovies() 

