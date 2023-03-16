const router = require('express').Router()
const { signIn, signOut, verifyAuth } = require('../controllers/auth.controller')

/**
 * Route serving signin user.
 * @name post/signin
 * @function
 * @param {string} path - Express path
 * @param {function} signIn - SignIn controller.
 */

router.post('/signin', signIn)

/**
 * Route serving signout user.
 * @name get/signout
 * @function
 * @param {string} path - Express path
 * @param {function} signOut - signOut controller.
 */

router.get('/signout', signOut)

/**
 * Route serving verifyAuth user.
 * @name get/verifyAuth
 * @function
 * @param {string} path - Express path
 * @param {function} verifyAuth - verifyAuth controller.
 */

router.get('/authenticated', verifyAuth)

module.exports = router
