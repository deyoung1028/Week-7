const express = require('express')
const app = express() 
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors()) 
app.use(bodyParser.json()) 

app.listen(3001, ()=> {
    console.log('server is running')
})
let todolist = [{title: "mow lawn",priority: "high", date: "08/16/21"}]

app.get('/todos', (req,res)=>{
  
    res.json(todolist)
    console.log(todolist)
})

app.post('/todos', (req,res) => {
 const title = req.body.title
 const priority = req.body.priority
 const date = req.body.date

 const task = {title:title, priority:priority,date:date}
 console.log(task)
 todolist.push(task)
 console.log(todolist)
 res.json({message:"Task has been added"})


})

