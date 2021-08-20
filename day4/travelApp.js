const express = require('express')
const travelApp = express() 
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const tripsRouter = require('./routes/trips')
const path = require('path')
const VIEWS_PATH = path.join(__dirname,'/views')


const authenticate = require('./authenticate/authenticatemiddleware')

travelApp.use('/css',express.static('css'))
travelApp.engine("mustache", mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
travelApp.set("views", VIEWS_PATH)
travelApp.set("view engine", "mustache")
travelApp.use(express.urlencoded())
travelApp.use(session({
    secret:'hyacinth',
    saveUninitialized: true,

}))
global.users = []
travelApp.use('/trips', tripsRouter)
travelApp.get('/register', (req, res) => {
    res.render('register')
})

travelApp.post('/register', (req,res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userName = req.body.userName
    const password = req.body.password
    
    let user = {firstName: firstName, lastName: lastName, userName:userName,  password: password}
    users.push(user)
    console.log(user)
    res.redirect('/login')
})

travelApp.get('/login', (req,res) =>{
    res.render('login')   
})

travelApp.post('/login', (req,res)=>{
    const userName = req.body.userName
    const password = req.body.password

    const persistedUser = users.find(user => {
        return user.userName ==userName && user.password == password
    })

    if(persistedUser) {
        if(req.session) {
            req.session.userName = persistedUser.userName
            res.redirect('/trips')
        }
        console.log(req.session)

    }else {
        res.render('login', {errorMessage: "Username or password is incorrect"})
    }
})


travelApp.get('/sign-out', (req, res) => {
    req.session.destroy(error => {
        res.clearCookie('connect.sid')
        res.redirect('/login')
    }) 
})

travelApp.listen(3000, () => {
    console.log('Server is running...the  question is, is your page running?')
})