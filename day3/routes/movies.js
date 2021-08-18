const express = require('express')
const router = express.Router()







router.post('/add-movie',(req,res)=>{
    const title = req.body.title
    const posterURL = req.body.posterURL
    const description  = req.body.description
    const genre = req.body.genre

    let movie = {movieID: movie.length +1,title:title, posterURL: posterURL, description:description, genre: genre}
    movies.push(movie)
    console.log(movies)
    res.redirect('/')
})



module.exports = router