const express = require('express')
const app = express() 
const mustacheExpress = require('mustache-express')



app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")
app.get("/", (req, res)=> {
    let name = "Jennie DeYoung"
    res.render("index", {name: name})
})

app.listen(3000, () => {
    console.log('Server is running...')
})