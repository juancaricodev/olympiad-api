const express = require('express')
const AverageService = require('../services/average')

function averageApi(app) {
  const router = express.Router()
  app.use('/api/average', router)

  const averageService = new AverageService

  // TODO:
  router.get('/:studentId', async function(req, res, next) {
    const { studentId } = req.params

    try {
      const average = await averageService.getAverage({ studentId })

      res.status(200).json({
        data: average,
        message: `average calculated for student ${studentId}`
      })
    } catch(err) {
      next(err)
    }
  })
}

module.exports = averageApi