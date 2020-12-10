const express = require('express')
const ScoresService = require('../services/scores')

function studentsApi(app) {
  const router = express.Router()
  app.use('/api/scores', router)

  const scoresService = new ScoresService

  // Get student's scores
  // FIXME: Pending a proper review on working
  router.get('/:studentId', async function(req, res, next) {
    const { studentId } = req.params

    try {
      const scores = await scoresService.getScores({ studentId })

      res.status(200).json({
        data: scores,
        message: 'student\'s scores listed'
      })
    } catch(err) {
      next(err)
    }
  })

  // TODO: Get student's one score only
  router.get('/:studentId', async function(req, res, next) {
    const { studentId } = req.params

    try {
      const student = await scoresService.getStudent({ studentId })

      res.status(200).json({
        data: student,
        message: 'student listed'
      })
    } catch(err) {
      next(err)
    }
  })

  // Create a student's score
  router.post('/:studentId', async function(req, res, next) {
    const { studentId } = req.params
    const { body: score } = req

    try {
      const createdScoreId = await scoresService.createScore({ studentId, score })

      res.status(200).json({
        data: createdScoreId,
        message: `score ${score.subject} created for student: ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })

  // TODO: Edit a student's score
  router.put('/:studentId', async function(req, res, next) {
    const { studentId } = req.params
    const { body: student } = req

    try {
      const updatedStudentId = await scoresService.updateStudent({ studentId, student })

      res.status(200).json({
        data: updatedStudentId,
        message: 'student updated'
      })
    } catch(err) {
      next(err)
    }
  })

  // Delete a student's score
  router.delete('/:studentId/:score', async function(req, res, next) {
    const { studentId, score } = req.params

    try {
      const deletedStudentId = await scoresService.deleteScore({ studentId, score })

      res.status(200).json({
        data: deletedStudentId,
        message: `score deleted: ${score}, from student: ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })
}

module.exports = studentsApi