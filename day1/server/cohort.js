const express = require('express')
const app = express()  

app.listen(3000, () => {
    console.log('Server is running...')
})

const dcCohort = [
    {name:"I attended DIGITAL CRAFTS COHORT", year:""}

]

app.get('/digital-crafts/cohort/:year',(req,res)=>{
    const year = req.params.year
    res.send(year)
    console.log(year)
})

