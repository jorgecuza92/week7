let todo = [
  {
    title: 'wash car',
    priority: 'low, med, high',
    dateCreated: '03/15/2021'
  } 
]

// import express into application, so we can run a server
const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors()) // CORS enabled on server
// tell express how to parse JSON BODY
app.use(express.json()) // MIDDLEWARE


// start the server
app.listen(3001, () => {
  console.log('Server is running...')
})

app.get("/todo", (req,res) => {
  res.json(todo)
})

// DELETE a task
app.delete('/todo/:title', (req,res) => {
  const title = req.params.title

  todo = todo.filter(task => task.title != title)
  res.json({message: "Task has been deleted!"})

})




app.post("/todo", (req,res) => {
  
  const title = req.body.title
  const priority = req.body.priority
  const dateCreated = req.body.dateCreated

  const task = {
    title: title, 
    priority: priority,
    dateCreated: dateCreated
  }
  todo.push(task)

  res.json({message: "Task has been added!"})

})