const express = require('express')
const MongoClient = require('mongodb')
require('dotenv').config()

const PORT = process.env.PORT
const DBURL = process.env.DBURL

let db

const app = express()

// TODO: Loic for connecting db

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})