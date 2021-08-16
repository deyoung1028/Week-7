const todolistUL = document.getElementById("todolistUL")
const addTaskbtn = document.getElementById("addTaskbtn")
const taskAPI = `http://localhost:3000/todos`
const taskTextBox = document.getElementById("taskTextBox")
const priorityselect = document.getElementById("priority")
const dateInput = document.getElementById("dateinput")


function getAllTasks() {
    fetch(`http://localhost:3001/todos`)
       .then(response => response.json())
       .then(tasks => {
           const taskItems = tasks.map((task)=> {
               return `<li>${task.title} - ${task.priority} -${task.date}`
           })
           todolistUL.innerHTML = taskItems.join("")
       })
}

getAllTasks()

addTaskbtn.addEventListener("click", function(){

    const title = taskTextBox.value
    const priority = priorityselect.value
    const date = dateInput.value

    fetch(`http://localhost:3001/todos`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            title:title,
            priority:priority,
            date:date
        })
    }).then(response => response.json())
       .then(result => {
           getAllTasks()
       })

    
})


function displayTasks(){
   let todolist= getAllTasks()
    const task = `
    <li>Title:${todolist.title}</li>
    <li>Title:${todolist.priority}</li>
    <li>Title:${todolist.date}</li>`

    console.log(task)
    todolistUL.innerHTML = task.join('')
}

displayTasks()

