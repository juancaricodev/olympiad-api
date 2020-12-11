const MongoLib = require('../lib/mongo')

class AverageService {
  constructor() {
    this.collection = 'students'
    this.mongoDB = new MongoLib()
  }

  // TODO:
  async getAverage({ studentId }) {
    const Average = await this.mongoDB.getStudentAverage(this.collection, studentId)
    return Average || {}
  }
}

module.exports = AverageService