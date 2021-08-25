var pgp = require('pg-promise')(/*options*/)
const connectionString =('postgres://honhhxbi:i9mJmQ_jNGsVkJku2KW8wbMgvree2lBc@chunee.db.elephantsql.com/honhhxbi')
const db = pgp(connectionString)
const express = require('express')
const authenticate = require('../authenticate/authenticatemiddleware')
const router = express.Router()



router.get('/', (req, res) => {
    db.any('SELECT trip_id, title, date_of_departure, date_of_return, imageurl, user_id FROM trips')
    .then(trips => {
     console.log(trips) 
     res.render('trips', {trips:trips})  
    })
})

router.get('/add-trip', authenticate, (req, res) => {
   const userId = req.session.user.user_id

   db.any('SELECT trip_id, title, date_of_departure, date_of_return, imageurl, user_id FROM trips WHERE user_id = $1', [userId])
   .then(trips => {
       console.log(trips)
       res.render('add-trip', {trips:trips})
   })
})


router.post('/add-trip',(req,res)=>{
    const title = req.body.title
    const imageURL = req.body.imageURL
    const dateofDeparture = req.body.dateofDeparture
    const dateofReturn = req.body.dateofReturn
    const userName = req.session.user_name
    const userId = req.session.user.user_id
     console.log(req.session)
    db.none('INSERT INTO trips(title, date_of_departure, date_of_return, imageurl, user_id)VALUES($1, $2, $3, $4, $5)', [title, dateofDeparture, dateofReturn, imageURL, userId])
    .then (() => {
        res.redirect('/trips')
    })
    

})

router.post('/delete-trip',(req, res)=>{
    const tripID = parseInt(req.body.tripID)
    
    db.none('DELETE FROM trips WHERE trip_id = $1;',[tripID])
    .then(() => {
        res.redirect('/trips') 
    })
    
})



module.exports = router
module.exports.dbConnection = db