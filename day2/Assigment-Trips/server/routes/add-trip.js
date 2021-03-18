const express = require('express')
const router = express.Router()


router.get('/', (req,res) => {
  res.render('index', { trips: trips })
})

module.exports = router // now other files can import router