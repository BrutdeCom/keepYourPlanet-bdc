const router = require('express').Router()
const user = require('./user')
const authRoutes = require('./auth')
const result = require('./result')

router.use('/auth', authRoutes)
router.use('/result', result)

router.use('/user', user)

module.exports = router
