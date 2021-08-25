
const express = require('express')
const travelApp = express() 
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const tripsRouter = require('./routes/trips.js')
const db = require('./routes/trips.js').dbConnection
const path = require('path')
const VIEWS_PATH = path.join(__dirname,'/views')
var pgp = require('pg-promise')(/*options*/)
const bcrypt = require('bcryptjs');

const authenticate = require('./authenticate/authenticatemiddleware')


travelApp.use('/css',express.static('css'))
travelApp.use('/chat', express.static('chat'))
travelApp.engine("mustache", mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
travelApp.set("views", VIEWS_PATH)
travelApp.set("view engine", "mustache")
travelApp.use(express.urlencoded())
travelApp.use(session({
    secret:'hyacinth',
    resave:true,
    saveUninitialized: true,

}))


travelApp.use('/trips', tripsRouter)
travelApp.get('/register', (req, res) => {
    res.render('register')
})


travelApp.post('/register', (req,res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userName = req.body.userName
    const password = req.body.password

    bcrypt.genSalt(10, function(error,salt){
        if(!error){
            bcrypt.hash(password, salt, function(error, hash){
                if(!error){
                    db.none('INSERT INTO users(user_name, password, first_name, last_name) VALUES($1, $2, $3, $4)', [userName, hash, firstName, lastName])
                    .then(() => {
                        console.log("User has been registered")
                        res.redirect('/login')
                    })
                } else {
                    res.send('Error Occured')
                }
            })

        }else {
            res.send('Error Occured')
        }
    })
    
})

travelApp.get('/login', (req,res) =>{
    res.render('login')   
})

travelApp.post('/login', (req,res)=>{
    const userName = req.body.userName;
    const password = req.body.password;

    db.one('SELECT user_id, user_name, password FROM users WHERE user_name = $1', [userName])
    .then((user) =>{
        bcrypt.compare(password, user.password, function(error, result){
            if(result) {
                if(req.session) {
                    req.session.user = {user_name: user.user_name, user_id:user.user_id}
                }
                res.redirect('/trips')
            }else {
                res.send('USER NOT AUTHENTICATED')
            }
        })
    }).catch((error) =>{
        res.send('USER NOT FOUND')
    })

  
})


travelApp.get('/sign-out', (req, res) => {
    req.session.destroy(error => {
        res.clearCookie('connect.sid')
        res.redirect('/login')
    }) 
})



travelApp.listen(3000,() => {
    console.log('Server is running...')
})

