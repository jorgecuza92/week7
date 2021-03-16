
// Server side pages means we will return a fully formed HTML page to the client
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

// setting up mustache as template engine 
app.engine('mustache', mustacheExpress())
// pages are located in the views directory
app.set('views', './views')
// extension for all pages will be mustache
app.set('view engine', 'mustache')

app.use(express.urlencoded()) // for parsing form submitted values

let tasks = [
  {title: 'Wash the car', priority: 'high'},
  {title: 'Feed dog', priority: 'medium'},
]

app.post('/create-task', (req,res) => {
  const title = req.body.title
  const priority = req.body.priority

  let task = {title: title, priority: priority}
  tasks.push(task)

  res.redirect("/tasks")
})


app.get('/add-task',  (req,res) => {
  res.render('add-task')
})

// localhost:3000/tasks
app.get('/tasks', (req,res) => {
  res.render('tasks', { allTasks: tasks, totalTasks: tasks.length })
})

// localhost:3000
app.get('/', (req,res) => {
  res.render('index', {productName: 'iPhone', price: 300})
})

app.listen(3000, () => {
  console.log('Server is running...')
})