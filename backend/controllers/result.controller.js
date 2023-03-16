const { getResult, addEvaluation, getCurrentResult } = require('../queries/result.queries')
const { updateTotalKmUser } = require('../queries/users.queries')
const passport = require('passport')
const { getGoogle } = require('../config/evaluation.config')

/**
 * listResult. If not error, return status code 200 and object with list of results return by getResult method,
 * and success boolean property at true
 * @module listResult
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */

exports.listResult = async (req, res, next) => {
  try {
    const results = await getResult() // attend la liste de results
    res.status(200).json({ success: true, data: results }) // affiche la liste de results
  } catch (error) {
    throw error
  }
}

/**
 * createResult. Add new result in database if user exist and is connected.
 * If error return status code 500.
 * If not user return object with isAuthenticated boolean at false, user with empty datas,
 * and error message.
 * If user is verified, add evaluation in database with addEvaluation method, and increment
 * totalKm in user profile datas in database. Return status 200 and evaluation object.
 * @module createResult
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */

exports.createResult = (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      const body = req.body
      const userID = user._id
      const evaluation = await addEvaluation(body, userID)
      const updateUserData = await updateTotalKmUser(evaluation, userID)
      res.status(200).json({ evaluation })
      return updateUserData
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * requestGoogle. Verify token authenticity with passport jwt strategy.
 * If error, return status code 500
 * If not user, (authenticity token failure), return object with isAuthenticated boolean at false,
 * empty user object, and message error.
 * Else, call getGoogle method for recover object with different available itinerary datas in google map API
 * with body parameter. Return status code 200 and coordinates object in frontend.
 * If body parameter is not available, return status code 400 and message error.
 * @module requestGoogle
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body The JSON payload contains start address end destination address.
 * @return {undefined}
 */

exports.requestGoogle = async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      const body = req.body
      const mapData = await getGoogle(body)
      if (mapData.status === 'OK') {
        const coordinates = {
          startLocation: mapData.routes[0].legs[0].start_location,
          endLocation: mapData.routes[0].legs[0].end_location
        }
        return res.status(200).json({ coordinates })
      }
      return res.status(400).json({ message: 'Cette itinéraire est invalide.' })
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * getCurrentEvaluation. Verify authenticity token with passport jwt strategy.
 * Get current evaluation in database with evaluation id. Return object evaluation in frontend.
 * @module getCurrentEvaluation
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body The JSON payload contains evaluation id.
 * @return {undefined}
 */

exports.getCurrentEvaluation = async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      const evaluationId = req.body._id
      const currentEvaluation = await getCurrentResult(evaluationId)
      res.status(200).json({ currentEvaluation })
    } catch (error) {
      throw error
    }
  })(req, res)
}
