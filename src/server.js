const express = require('express')
const app = express()

const { config } = require('./config/index')
const studentsApi = require('./routes/students')

// Body Parser
app.use(express.json())

studentsApi(app)

app.listen(config.port, () => {
  console.log(`Server listening on port: http://localhost:${config.port}`)
})
