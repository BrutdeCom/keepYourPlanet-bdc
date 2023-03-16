const passport = require('passport')
const { app } = require('../app')
const User = require('../database/models/user.model')
const LocalStrategy = require('passport-local').Strategy
const JwtStragegy = require('passport-jwt').Strategy
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
require('dotenv').config()
const { verifyUsername, verifyPassword } = require('../config/security.config')

/**
 * Secret
 * @type {string}
 */

const secret = process.env.SECRET_KEY

app.use(passport.initialize())

passport.use('jwt', new JwtStragegy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}, async (payload, done) => {
  await User.findById({ _id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}))

passport.use('local', new LocalStrategy((username, password, done) => {
  try {
    if (!verifyUsername(username)) {
      return done(null, false, { message: 'Le nom d\'utilisateur doit faire entre 5 et 14 caractères.' })
    }
    if (!verifyPassword(password)) {
      return done(null, false, { message: 'Votre mot de passe doit contenir au moins 16 caractères, une minuscule, une majuscule et un symbole spécial' })
    }
    User.findOne({ username }, async (err, user) => {
      if (err) {
        done(err)
      }
      if (!user) {
        return done(null, false, { message: 'L\'utilisateur n\'existe pas.' })
      }
      const match = await user.comparePassword(password)
      if (match) {
        done(null, user)
      } else {
        done(null, false, { message: 'Le mot de passe ne correspond pas.' })
      }
    })
  } catch (error) {
    done(error)
  }
}))
