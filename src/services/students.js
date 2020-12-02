const MongoLib = require('../lib/mongo')

class StudentsService {
  constructor() {
    this.collection = 'students'
    this.mongoDB = new MongoLib()
  }

  async getStudents() {
    const students = await this.mongoDB.getAll(this.collection)
    return students || []
  }

  async getStudent({ studentId }) {
    const student = await this.mongoDB.get(this.collection, studentId)
    return student || {}
  }

  async createStudent({ student }) {
    const createdStudentId = await this.mongoDB.create(this.collection, student)
    return createdStudentId
  }

  async updateStudent({ studentId, student } = {}) {
    const updatedStudentId = await this.mongoDB.update(this.collection, studentId, student)
    return updatedStudentId
  }

  async deleteStudent({ studentId }) {
    const deletedStudentId = await this.mongoDB.delete(this.collection, studentId)
    return deletedStudentId
  }
}

module.exports = StudentsService