const express = require('express')
const travelApp = express() 
const mustacheExpress = require('mustache-express')
const session = require('express-session')

travelApp.use('/css',express.static('css'))
travelApp.engine("mustache", mustacheExpress())

travelApp.set("views", "./views")

travelApp.set("view engine", "mustache")
travelApp.use(express.urlencoded())

travelApp.use(session({
    secret:'hyacinth',
    saveUninitialized: true 

}))

let trips = []
travelApp.post('/add-trip',(req,res)=>{
    const title = req.body.title
    const imageURL = req.body.imageURL
    const dateofDeparture = req.body.dateofDeparture
    const dateofReturn = req.body.dateofReturn
    const userName = req.session.userName

    let trip = {tripID: trips.length +1,userName: userName, title:title, imageURL: imageURL, dateofDeparture:dateofDeparture, dateofReturn: dateofReturn}
    trips.push(trip)
    console.log(trips)
    res.redirect('/trips')
    
})

travelApp.get('/add-trip', (req, res) => {
    let userName = req.session.userName
    trips = trips.filter((trip) => {
        return trip.userName == userName
    })
    res.render('add-trip', {userName: userName, allTrips: trips, totalTrips: trips.length })
})

travelApp.get('/trips',(req,res)=>{
    let userName = req.session.userName
    let userTrips = trips.filter((trip)=>{
        return trip.username == userName

    })
    res.render('trips',{allTrips: userTrips})
    console.log(userTrips)
})

travelApp.post('/delete-trip',(req, res)=>{
    const tripID = parseInt(req.body.tripID)
     console.log(tripID)
    trips = trips.filter((trip)=>{
        return trip.tripID != tripID
    })
    res.redirect('/trips')
})

let users = []

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
        }
        console.log(req.session)
        res.redirect('/add-trip')

    }else {
        res.render('login', {errorMessage: "Username or password is incorrect"})
    }
})

travelApp.post('/sign-out', (req, res) => {
    req.session.userName = ''
    res.redirect('/login')
})


travelApp.listen(3000, () => {
    console.log('Server is running...the  question is, is your page running?')
})