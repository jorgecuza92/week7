
// Server Side Pages setup
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

// setting up mustache as template engine
app.engine('mustache', mustacheExpress())
// pages are located in the views directory
app.set('views', './views')
//exttension for all pages will be mustache
app.set('view engine', 'mustache')

app.get('/', (req,res) => {
  res.render('index', {message: 'Hello World!'})
})



app.listen(3000, () => {
  console.log('Server is running...')
})