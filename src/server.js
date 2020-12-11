const express = require('express')
const app = express()

const { config } = require('./config/index')
const studentsApi = require('./routes/students')
const scoresApi = require('./routes/scores')
const averageApi = require('./routes/average')

// Body Parser
app.use(express.json())

studentsApi(app)
scoresApi(app)
averageApi(app)

app.listen(config.port, () => {
  console.log(`Server listening on port: http://localhost:${config.port}`)
})
