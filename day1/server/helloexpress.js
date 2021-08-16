

const express = require('express')
const app = express()
let name = {"firstname": "John", "lastname": "Doe"}

app.get('/name', (req, res)=>
{
    res.json(name)
    console.log(name)
})

app.listen(3000, () =>{
    console.log("server is running")
})