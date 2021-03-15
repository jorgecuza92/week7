const express = require('express')
const activity1 = express()

activity1.get("/name", (req,res) => {
  let name = {firstname: "Jorge", lastname: "Cuza"}
  res.json(name)
})

activity1.listen(3000, () => {
  console.log("Server is running...")
})