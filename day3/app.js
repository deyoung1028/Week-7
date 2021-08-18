const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.json())
app.use(express.urlencoded())

global.movies = []

app.post('/create',(req,res)=>{
    const title = req.body.title
    const posterURL = req.body.posterURL
    const description  = req.body.description
    const genre = req.body.genre

    let movie = {movieID: movies.length +1,title:title, posterURL: posterURL, description:description, genre: genre}
    movies.push(movie)
    console.log(movies)
    res.redirect('/movies')
})

app.get('/create', (req, res)=> {
    res.render('create')
})

app.get('/movies', (req, res)=>{
    res.render('index', {allMovies: movies, totalMovies: movies.length})
})

app.get('movies/:movieID', (req, res)=>{
    res.render('details', {movieDetails:movie})
})

app.post('/delete-movie',(req, res)=>{
    const movieID = parseInt(req.body.movieID)
     console.log(movieID)
    movies = movies.filter((movie)=>{
        return movie.movieID != movieID
    })
    res.redirect('/movies')
})



app.listen(3000, ()=>{
    console.log('server is running it may not be working properly, but it is running!')
})


