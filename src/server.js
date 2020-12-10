const express = require('express')
const app = express()

const { config } = require('./config/index')
const studentsApi = require('./routes/students')
const scoresApi = require('./routes/scores')

// Body Parser
app.use(express.json())

studentsApi(app)
scoresApi(app)

app.listen(config.port, () => {
  console.log(`Server listening on port: http://localhost:${config.port}`)
})
