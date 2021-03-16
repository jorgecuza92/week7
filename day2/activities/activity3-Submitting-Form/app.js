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

let customers = []

app.post('/add-customer', (req,res) => {
  const name = req.body.name
  const age = req.body.age

  let customer = {name: name, age: age}
  customers.push(customer)

  res.redirect('/confirmation')
})



app.get('/add-customer', (req,res) => {
  res.render('add-customer')
})

app.get('/confirmation', (req,res) => {
  res.render('confirmation', {allCustomers: customers})
})

app.listen(3000, () => {
  console.log('Server running...')
})