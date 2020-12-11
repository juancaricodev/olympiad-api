const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const HOST = config.dbHost

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { userNewUrlParser: true })
    this.dbName = DB_NAME
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err)
          }

          console.log('Connected successfully to Mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection
  }

  // MongoDB Action Methods
  getAll(collection) {
    return this.connect().then(db => {
      return db.collection(collection).find().toArray()
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  create(collection, data) {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data)
    }).then(result => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    }).then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) })
    }).then(() => id)
  }

  // MongoDB Action Methods for Scores
  getStudentScores(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).find({ _id: ObjectId(id) }).project({ scores: 1 }).toArray()
    })
  }

  //TODO:
  getStudentScore(collection, id, subject) {
    return db.collection(collection).find({ _id: ObjectId(id)}, {
      stores: { $all: [subject] }
    }).toArray()
  }

  createStudentScore(collection, id, data) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $push: { scores: data } }, { upsert: true })
    }).then(result => result.upsertedId || id)
  }

  updateStudentScore(collection, id, subject, data){
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id), 'scores.subject': subject }, { $set: { 'scores.$': data } }, { upsert: true })
    }).then(result => result.upsertedId || id)
  }

  deleteStudentScore(collection, id, score) {
    return this.connect().then(db => {
      return db.collection(collection).update({ _id: ObjectId(id) }, { $pull: { 'scores': { 'name': { $in: [score] } } } })
    }).then(() => id)
  }
}

module.exports = MongoLib