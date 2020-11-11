const express = require('express')
const app = express()

const { config } = require('./config/index')

app.listen(config.port, () => {
  console.log(`Server listening on port: http://localhost:${config.port}`)
})
