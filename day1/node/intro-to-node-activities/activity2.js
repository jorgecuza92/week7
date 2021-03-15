const express = require('express')
const activity2 = express()

activity2.get("/digital-crafts/cohort/:year", (req,res) => {
  const year = "I study at DigitalCrafts " + req.params.year + " cohort"
  res.send(year)
})

activity2.listen(3000, () => {
  console.log("Server is running...")
})