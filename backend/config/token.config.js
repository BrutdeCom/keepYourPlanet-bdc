const JWT = require('jsonwebtoken')
require('dotenv').config()

/**
 * Secret
 * @type {string}
 */

const secret = process.env.SECRET_KEY

/**
 * Create Token.
 * @param {string} userID - Contains user ID.
 * @returns {string} Return user token.
 */

exports.signToken = userID => {
  return JWT.sign({
    iss: 'KeepYourPlanet',
    sub: userID
  }, secret, { expiresIn: '336h' })
}
