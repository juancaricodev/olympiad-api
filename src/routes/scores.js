const express = require('express')
const ScoresService = require('../services/scores')

function studentsApi(app) {
  const router = express.Router()
  app.use('/api/scores', router)

  const scoresService = new ScoresService

  // Get all scores of a student
  router.get('/:studentId', async function(req, res, next) {
    const { studentId } = req.params

    try {
      const scores = await scoresService.getScores({ studentId })

      res.status(200).json({
        data: scores,
        message: `scores listed for student: ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })

  // Get one score of a student
  router.get('/:studentId/:subject', async function(req, res, next) {
    const { studentId, subject } = req.params

    try {
      const score = await scoresService.getScore({ studentId, subject })

      res.status(200).json({
        data: score,
        message: `score of ${subject} listed for student ${studentId}`
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
        message: `score of ${score.subject} created for student: ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })

  // Edit a student's score - WIP
  router.put('/:studentId/:subject', async function(req, res, next) {
    const { studentId, subject } = req.params
    const { body: data } = req

    try {
      const updatedScore = await scoresService.updateScore({ studentId, subject, data })

      res.status(200).json({
        data: updatedScore,
        message: `score of ${subject} updated for student: ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })

  // Delete a student's score
  router.delete('/:studentId/:score', async function(req, res, next) {
    const { studentId, score } = req.params

    try {
      const deletedScore = await scoresService.deleteScore({ studentId, score })

      res.status(200).json({
        data: deletedScore,
        message: `score deleted: ${score}, from student: ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })
}

module.exports = studentsApi