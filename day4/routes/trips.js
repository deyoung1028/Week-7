
const express = require('express')
const router = express.Router()

router.get('/add-trip', (req, res) => {
    let userName = req.session.userName
    let userTrips = trips.filter((trip) => {
        return trip.userName == userName
    })
    res.render('add-trip', {userName: userName, allTrips: userTrips, totalTrips: trips.length })
})

global.trips = []
router.post('/add-trip',(req,res)=>{
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

router.post('/delete-trip',(req, res)=>{
const tripID = parseInt(req.body.tripID)
 console.log(tripID)
trips = trips.filter((trip)=>{
    return trip.tripID != tripID
})
res.redirect('/')
})


router.get('/', (req,res)=>{
    let userName = req.session.userName
    let userTrips = trips.filter((trip)=>{
        return trip.userName == userName

    })
    res.render('trips',{allTrips: userTrips})
    console.log(userTrips)
})







module.exports = router