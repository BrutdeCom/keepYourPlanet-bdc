const passport = require('passport')
const { signToken } = require('../config/token.config')

/**
 * SignIn route verify user authentication. Return error message if user doesn't exist. Generate token,
 * and return token with user datas object if user exist.
 * @module signIn
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */

exports.signIn = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.status(400).json({ message: info.message })
      }
      if (user) {
        const { _id } = user
        const token = signToken(_id)
        res.status(200).json({ isAuthenticated: true, user, token })
      }
    } catch (error) {
      throw error
    }
  }
  )(req, res)
}

/**
 * SignOut route allows sign out user in frontend. If not error,
 * return object with empty user data and isAuthenticated false.
 * @module signOut
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} err - Express error object
 * @return {undefined}
 */

exports.signOut = (req, res, err) => {
  try {
    if (err) {
      res.status(500)
    }
    res.status(200).json({ user: { username: '' }, isAuthenticated: false, success: true })
  } catch (error) {
    throw error
  }
}

/**
 * verifyAuth verify if user exist in database, and if user token coming from front-end
 * matches with backend. If not matches, return object with empty user, false boolean for
 * isAuthenticated and error message.
 * If matches, return object with true boolean for isAuthenticated and user datas.
 * @module verifyAuth
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */

exports.verifyAuth = (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      res.status(200).json({ isAuthenticated: true, user })
    } catch (error) {
      throw error
    }
  })(req, res)
}
