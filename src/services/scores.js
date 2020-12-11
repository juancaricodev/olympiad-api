const MongoLib = require('../lib/mongo')

class ScoresService {
  constructor() {
    this.collection = 'students'
    this.mongoDB = new MongoLib()
  }

  async getScores({ studentId }) {
    const Scores = await this.mongoDB.getStudentScores(this.collection, studentId)
    return Scores || []
  }

  async getScore({ studentId, subject }) {
    const score = await this.mongoDB.getStudentScore(this.collection, studentId, subject)
    return score || {}
  }

  async createScore({ studentId, score }) {
    const createdScoreId = await this.mongoDB.createStudentScore(this.collection, studentId, score)
    return createdScoreId
  }

  async updateScore({ studentId, subject, data } = {}) {
    const updatedScore = await this.mongoDB.updateStudentScore(this.collection, studentId, subject, data)
    return updatedScore
  }

  async deleteScore({ studentId, score }) {
    const deletedScoreId = await this.mongoDB.deleteStudentScore(this.collection, studentId, score)
    return deletedScoreId
  }
}

module.exports = ScoresService