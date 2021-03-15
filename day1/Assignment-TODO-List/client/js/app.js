const tasksUL = document.getElementById('tasksUL')
const addTaskButton = document.getElementById('addTaskButton')
const title = document.getElementById('taskTextBox')
const priority = document.getElementById('priorityTextBox')
const dateCreated = document.getElementById('dateTextBox')


addTaskButton.addEventListener('click', function () {

  const title = taskTextBox.value 
  const priority = priorityTextBox.value 
  const dateCreated = dateTextBox.value

  fetch('http://localhost:3001/todo', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      priority: priority,
      dateCreated: dateCreated
    })
  }).then(response => response.json())
    .then(result => {
      getAllTasks()
    })


})


function getAllTasks() {
  fetch('http://localhost:3001/todo')
    .then(response => response.json())
    .then(todo => {
      const todoItems = todo.map((task) => {
        return `<li>${task.title} - ${task.priority} - ${task.dateCreated}</li>
                <button onclick="#">remove task</button>`
              
      })
      tasksUL.innerHTML = todoItems.join("")
    })
}

getAllTasks()


function deleteTask() {
  fetch('http://localhost:3001/todo/:title', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    
  })

}