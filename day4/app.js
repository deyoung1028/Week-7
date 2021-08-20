const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const app = express()

// middleware 
app.use(express.urlencoded())
// middleware 
app.use(express.static('public'))
app.use(session({
    secret: 'THISISSECRETKEY', 
    saveUninitialized: true 
}))

app.engine('mustache', mustacheExpress())
    // the pages are located in views directory
app.set('views', './views')
    // extension will be .mustache
app.set('view engine', 'mustache')

app.length('/', (req, res) => {

    if(req.session){
        req.session.counter = 
    }
})


app.listen(3000,() => {
    console.log('Server is running...the question is .... does it work?')
})