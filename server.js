const express = require('express')
const studentRouter = require('./src/students')
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// use Student Routers 
app.use(studentRouter);

//use Port If PORT Available in env then use this port or default port is 3000
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
