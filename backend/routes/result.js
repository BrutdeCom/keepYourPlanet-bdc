const router = require('express').Router()
const { listResult, createResult, requestGoogle, getCurrentEvaluation } = require('../controllers/result.controller')

/**
 * Route serving list result.
 * @name get/list
 * @function
 * @param {string} path - Express path
 * @param {function} listResult - listResult controller.
 */

router.get('/list', listResult)

/**
 * Route serving add result.
 * @name post/add
 * @function
 * @param {string} path - Express path
 * @param {function} createResult - createResult controller.
 */

router.post('/add', createResult)

/**
 * Route serving google api request.
 * @name post/google-api
 * @function
 * @param {string} path - Express path
 * @param {function} requestGoogle - requestGoogle controller.
 */

router.post('/google-api', requestGoogle)

/**
 * Route serving evaluation result.
 * @name post/evaluation-result
 * @function
 * @param {string} path - Express path
 * @param {function} getCurrentEvaluation - getCurrentEvaluation controller.
 */

router.post('/evaluation-result', getCurrentEvaluation)

module.exports = router
