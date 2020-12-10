const MongoLib = require('../lib/mongo')

class ScoresService {
  constructor() {
    this.collection = 'students'
    this.mongoDB = new MongoLib()
  }

  async getScores({ studentId }) {
    const query = studentId
    const Scores = await this.mongoDB.getStudentScores(this.collection, query)
    return Scores || []
  }

  // TODO:
  async getScore({ scoreId }) {
    const score = await this.mongoDB.get(this.collection, scoreId)
    return score || {}
  }

  // TODO: WIP
  async createScore({ studentId, score }) {
    const createdScoreId = await this.mongoDB.createStudentScore(this.collection, studentId, score)
    return createdScoreId
  }

  // TODO:
  async updateScore({ scoreId, score } = {}) {
    const updatedScoreId = await this.mongoDB.update(this.collection, scoreId, score)
    return updatedScoreId
  }

  // TODO:
  async deleteScore({ scoreId }) {
    const deletedScoreId = await this.mongoDB.delete(this.collection, scoreId)
    return deletedScoreId
  }
}

module.exports = ScoresService