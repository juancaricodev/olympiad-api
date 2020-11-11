const { MongoClient, ObjectId } = require('mongodb')
const { connect } = require('mongoose')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@olympiad.ooblw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { userNewUrlParser: true })
    this.dbName = DB_NAME
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        if (err) {
          reject(err)
        }

        console.log('Connected successfully to Mongo')
        resolve(this.client.db(this.dbName))
      })
    }

    return MongoLib.connection
  }
}

module.exports = MongoLib