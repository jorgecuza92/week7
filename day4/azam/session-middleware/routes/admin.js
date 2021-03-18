

const express = require('express')
const router = express.Router() 

// /admin 
router.get('/', (req, res) => {
    res.send("Admin")
})

// /admin/revenue 
router.get('/revenue', (req, res) => {
    res.send("Revenue")
})


// /admin/dashboard
router.get('/dashboard', (req, res) => {
    res.send("Dashboard")
})

module.exports = router 