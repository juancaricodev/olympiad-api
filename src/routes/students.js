const express = require('express')
const StudentsService = require('../services/students')

function studentsApi(app) {
  const router = express.Router()
  app.use('/api/students', router)

  const studentService = new StudentsService

  router.get('/', async function(req, res, next) {
    try {
      const students = await studentService.getStudents()

      res.status(200).json({
        data: students,
        message: 'students listed'
      })
    } catch(err) {
      next(err)
    }
  })

  router.get('/:studentId', async function(req, res, next) {
    const { studentId } = req.params

    try {
      const student = await studentService.getStudent({ studentId })

      res.status(200).json({
        data: student,
        message: 'student listed'
      })
    } catch(err) {
      next(err)
    }
  })

  router.post('/', async function(req, res, next) {
    const { body: student } = req

    try {
      const createdStudentId = await studentService.createStudent({ student })

      res.status(201).json({
        data: createdStudentId,
        message: 'student created'
      })
    } catch(err) {
      next(err)
    }
  })

  router.put('/:studentId', async function(req, res, next) {
    const { studentId } = req.params
    const { body: student } = req

    try {
      const updatedStudentId = await studentService.updateStudent({ studentId, student })

      res.status(200).json({
        data: updatedStudentId,
        message: 'student updated'
      })
    } catch(err) {
      next(err)
    }
  })

  router.delete('/:studentId', async function(req, res, next) {
    const { studentId } = req.params

    try {
      const deletedStudentId = await studentService.deleteStudent({ studentId })

      res.status(200).json({
        data: deletedStudentId,
        message: 'student deleted'
      })
    } catch(err) {
      next(err)
    }
  })
}

module.exports = studentsApi