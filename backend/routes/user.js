const router = require('express').Router()
const { createUser, listUser, resetPasswordUser, updateVehicleUser, getProfileUser, getRegistrationApi, deleteUser, updateUser } = require('../controllers/user.controller')

/**
 * Route serving list user.
 * @name get/list
 * @function
 * @param {string} path - Express path
 * @param {function} listUser - listUser controller.
 */

router.get('/list', listUser)

/**
 * Route serving create user.
 * @name post/add
 * @function
 * @param {string} path - Express path
 * @param {function} createUser - createUser controller.
 */

router.post('/add', createUser)

/**
 * Route serving reset password user.
 * @name post/reset
 * @function
 * @param {string} path - Express path
 * @param {function} resetPasswordUser - resetPasswordUser controller.
 */

router.post('/reset', resetPasswordUser)

/**
 * Route serving update vehicle user.
 * @name post/add-fuel-type
 * @function
 * @param {string} path - Express path
 * @param {function} updateVehicleUser - updateVehicleUser controller.
 */

router.post('/add-fuel-type', updateVehicleUser)

/**
 * Route serving update vehicle user.
 * @name get/get-user-data
 * @function
 * @param {string} path - Express path
 * @param {function} getProfileUser - getProfileUser controller.
 */

router.post('/get-user-data', getProfileUser)

/**
 * Route serving get registration api for vehicle datas.
 * @name post/get-registration
 * @function
 * @param {string} path - Express path
 * @param {function} getRegistrationApi - getRegistrationApi controller.
 */

router.post('/get-registration', getRegistrationApi)

/**
 * Route serving delete user.
 * @name post/delete
 * @function
 * @param {string} path - Express path
 * @param {function} deleteUser - deleteUser controller.
 */

router.post('/delete', deleteUser)

/**
 * Route serving update user.
 * @name post/update
 * @function
 * @param {string} path - Express path
 * @param {function} updateUser - updateUser controller.
 */

router.post('/update', updateUser)

module.exports = router
