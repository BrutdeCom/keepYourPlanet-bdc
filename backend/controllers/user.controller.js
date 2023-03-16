const passport = require('passport')
const parseString = require('xml2js').parseString

const { getUsers, addUser, changePassword, updateVehicle, updateVehicleRegistration, deleteUserById, updateUserById } = require('../queries/users.queries')
const { verifyUsername, verifyEmail, verifyPassword, findUserPerUsername, findUserPerEmail, verifyRegistration } = require('../config/security.config')
const { getResultByYearDate } = require('../queries/result.queries')
const { calculateGlobalDataUser, getImmatApi } = require('../config/user.config')

/**
 * listUser. Return database users list.
 * @module listUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {undefined}
 */

exports.listUser = async (req, res, next) => {
  try {
    const users = await getUsers()
    res.status(200).json({ success: true, users })
  } catch (error) {
    throw error
  }
}

/**
 * createUser. Create new user in database.
 * @module createUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} err - Express error object
 * @param {Object} req.body - JSON payload with username, email and password user data.
 * @return {undefined}
 */

exports.createUser = async (req, res, err) => {
  try {
    const body = req.body
    const { username, email, password } = req.body

    console.log('test')

    if (err) {
      res.status(500)
    }

    if (!verifyPassword(password)) {
      return res.status(400).json({ message: 'Votre mot de passe doit contenir au moins 16 caractères, une minuscule, une majuscule et un symbole spécial' })
    }
    if (!verifyEmail(email)) {
      return res.status(400).json({ message: 'L\'email est invalide.' })
    }
    if (!verifyUsername(username)) {
      return res.status(400).json({ message: 'Le nom d\'utilisateur doit faire entre 5 et 14 caractères.' })
    }
    const userEmail = await findUserPerEmail(email)
    if (userEmail) {
      return res.status(400).json({ message: 'L\'email est déjà utilisé.' })
    }
    const userUsername = await findUserPerUsername(username)
    if (userUsername) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà.' })
    }
    addUser(body)
    res.status(200).json({ message: 'Vous êtes bien inscrit !' })
  } catch (error) {
    throw error
  }
}

/**
 * resetPasswordUser. Reset password user in database and return message in frontend according to the conditions met.
 * @module resetPasswordUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} err - Express error object
 * @param {Object} req.body - JSON payload with actual password and new password.
 * @return {undefined}
 */

exports.resetPasswordUser = async (req, res, err) => {
  const { password, newPassword, newPasswordConfirm } = req.body
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json(null, false, { message: 'L\'utilisateur n\'existe pas.' })
      }
      const match = await user.comparePassword(password)
      if (!match) {
        return res.status(400).json({ message: 'Votre ancien mot de passe ne correspond pas.' })
      }
      if (newPassword === newPasswordConfirm) {
        if (!verifyPassword(newPassword)) {
          return res.status(400).json({ message: 'Votre mot de passe doit contenir au moins 16 caractères, une minuscule, une majuscule et un symbole spécial.' })
        }
        await changePassword(newPassword, user)
        return res.status(200).json({ message: 'Mot de passe modifié avec succès.' })
      }
      if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({ message: 'Vos mots de passe ne sont pas identiques.' })
      }
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * updateVehicleUser. Verify token authenticity. If it's ok, update vehicle user in database and return
 * message success in frontend.
 * @module updateVehicleUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - JSON payload.
 * @return {undefined}
 */

exports.updateVehicleUser = (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      const payload = req.body
      const userID = user._id
      await updateVehicle(payload, userID)
      res.status(200).json({ message: 'Véhicule ajouté avec succès.' })
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * getProfileUser. Verify token authenticity. If it's ok, send results global (per user and per date) data profile user in frontend and return
 * message success.
 * @module getProfileUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - JSON payload.
 * @return {undefined}
 */

exports.getProfileUser = (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      const userID = user._id
      const year = req.body.year
      const results = await getResultByYearDate(userID, year)
      const globalDatas = await calculateGlobalDataUser(results)
      res.status(200).json({ isAuthenticated: true, user, results, globalDatas })
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * getRegistrationApi. Verify token authenticity. If it's ok, get registration vehicle api and recuperate corresponding
 * vehicle datas and update user model in database with vehicle datas. Return object vehicle datas in frontend.
 * @module getRegistrationApi
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - JSON payload.
 * @return {object} - Vehicle object datas.
 */

exports.getRegistrationApi = async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      if (!user) {
        return res.json({ isAuthenticated: false, user: { username: '' }, message: 'Utilisateur introuvable.' })
      }
      const userID = user._id
      const registration = req.body.registration
      if (!verifyRegistration(registration)) {
        return res.status(400).json({ message: 'Plaque d\'immatriculation invalide.' })
      }
      const dataVehicle = await getImmatApi(registration)
      if (!dataVehicle) {
        return res.status(500).json({ message: 'Plaque d\'immatriculation invalide.' })
      }
      parseString(dataVehicle, async function (err, result) {
        if (err) {
          return res.status(500).json({ message: 'Plaque d\'immatriculation invalide.' })
        }
        const innerJson = result.Vehicle.vehicleJson
        const vehicleJson = JSON.parse(innerJson)
        await updateVehicleRegistration(vehicleJson, userID)
        res.status(200).json({ vehicleJson })
      })
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * deleteUser. Verify token authenticity. Send id user in queries folder for delete user and return message for confirm in frontend.
 * @module deleteUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - JSON payload.
 * @return {undefined}
 */

exports.deleteUser = async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      const userRole = user.role
      if (userRole !== 'admin') {
        return res.status(401).json({ message: 'Vous n\'avez pas les droits requis pour supprimer un utilisateur.' })
      }
      const idUser = req.body.idUser
      await deleteUserById(idUser)
      res.status(200).json({ success: true, message: 'L\'utilisateur à ben été supprimé.' })
    } catch (error) {
      throw error
    }
  })(req, res)
}

/**
 * updateUser. Verify token authenticity.  Send id user in queries folder for update user and return message for confirm in frontend.
 * @module deleteUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - JSON payload.
 * @return {undefined}
 */

exports.updateUser = (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      if (err) {
        res.status(500)
      }
      const userUpdate = req.body
      const userRole = user.role
      if (userRole !== 'admin') {
        return res.status(401).json({ message: 'Vous n\'avez pas les droits requis pour effectué une modification.' })
      }
      await updateUserById(userUpdate)
      res.status(200).json({ success: true, message: 'L\'utilisateur à ben été modifié.' })
    } catch (error) {
      throw error
    }
  })(req, res)
}
