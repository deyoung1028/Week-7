const express = require('express')
const travelApp = express() 
const mustacheExpress = require('mustache-express')

travelApp.use('/css',express.static('css'))
travelApp.engine("mustache", mustacheExpress())

travelApp.set("views", "./views")

travelApp.set("view engine", "mustache")
travelApp.use(express.urlencoded())

let trips = []
travelApp.post('/add-trip',(req,res)=>{
    const title = req.body.title
    const imageURL = req.body.imageURL
    const dateofDeparture = req.body.dateofDeparture
    const dateofReturn = req.body.dateofReturn

    let trip = {tripID: trips.length +1,title:title, imageURL: imageURL, dateofDeparture:dateofDeparture, dateofReturn: dateofReturn}
    trips.push(trip)
    res.redirect('/trips')
    
})

travelApp.get('/add-trip', (req, res) => {
    res.render('add-trip')
})

travelApp.get('/trips',(req,res)=>{
    res.render('trips',{allTrips: trips, totalTrips: trips.length})
})

travelApp.post('/delete-trip',(req, res)=>{
    const tripID = parseInt(req.body.tripID)
     console.log(tripID)
    trips = trips.filter((trip)=>{
        return trip.tripID != tripID
    })
    res.redirect('/trips')
})

travelApp.listen(3000, () => {
    console.log('Server is running...')
})