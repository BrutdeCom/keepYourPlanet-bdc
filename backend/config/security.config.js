const User = require('../database/models/user.model')

/**
 * Email Regex
 * @type {regex}
 */

const EMAIL_REGEX = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/

/**
 * Password Regex
 * @type {regex}
 */

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!$%*+/@_-])([\w!$%*+@-]{16,})$/

/**
 * Registration Regex
 * @type {regex}
 */

const REGISTRATION_REGEX = /^[A-Za-z]{2}-?\d{3}-?[A-Za-z]{2}$/

/**
 * Verify username.
 * @param {string} username - Contains username.
 * @returns {boolean} Return a boolean for verify conditions input for username.
 */

const verifyUsername = (username) => {
  try {
    if (!username || username.length === 0 || username.length < 4 || username.length > 14) {
      return false
    }
    return true
  } catch (error) {
    throw error
  }
}

/**
 * Verify email.
 * @param {string} email - Contains email.
 * @returns {boolean} Return a boolean for verify conditions input for email.
 */

const verifyEmail = (email) => {
  try {
    if (!email || email.length === 0 || !EMAIL_REGEX.test(email)) {
      return false
    }
    return true
  } catch (error) {
    throw error
  }
}

/**
 * Verify password.
 * @param {string} password - Contains password.
 * @returns {boolean} Return a boolean for verify conditions input for password.
 */

const verifyPassword = (password) => {
  try {
    if (!password || password.length === 0 || !PASSWORD_REGEX.test(password)) {
      return false
    }
    return true
  } catch (error) {
    throw error
  }
}

/**
 * Find user per username in database.
 * @param {string} username - Contains username.
 * @returns {object} Return a object with user datas.
 */

const findUserPerUsername = async (username) => {
  return await User.findOne({ username: username }).exec()
}

/**
 * Find user per email in database.
 * @param {string} email - Contains email.
 * @returns {object} Return a object with user datas.
 */

const findUserPerEmail = async (email) => {
  return await User.findOne({ email: email }).exec()
}

/**
 * Verify verifyRegistration.
 * @param {string} registration - Contains vehicle registration.
 * @returns {boolean} Return a boolean for verify conditions input for registration.
 */

const verifyRegistration = (registration) => {
  try {
    if (!registration || registration.length < 7 || registration.length > 9 || !REGISTRATION_REGEX.test(registration)) {
      return false
    }
    return true
  } catch (error) {
    throw error
  }
}

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyUsername,
  findUserPerEmail,
  findUserPerUsername,
  verifyRegistration
}
