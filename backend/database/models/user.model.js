const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = mongoose.Schema

/**
 * @class userSchema
 * @property {string} email User email
 * @property {string} password User password
 * @property {string} username User username
 * @property {string} address User address
 * @property {string} role User rôle
 * @property {string} email User email
 * @property {string} vehicle.licencePlate License plate for user vehicle
 * @property {string} vehicle.marque Marque for user vehicle
 * @property {string} vehicle.model Model for user vehicle
 * @property {number} vehicle.year Year for user vehicle
 * @property {string} vehicle.carburant Fuel type for user vehicle
 * @property {number} vehicle.emission CO2 emission for user vehicle
 * @property {number} globalData.totalKm Total Km for user
 * @property {number} globalData.totalImpact Total impact for user
 * @property {number} globalData.treeToPlant Total tree to plants equivalents for user
 * @property {number} globalData.numberTel Total manufactured smartphone equivalents for user
 */

const userSchema = schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['user', 'admin']
  },
  vehicle: {
    licencePlate: {
      type: String
    },
    marque: {
      type: String
    },
    model: {
      type: String
    },
    year: {
      type: Number
    },
    carburant: {
      type: String
    },
    emission: {
      type: Number
    }
  },
  globalData: {
    totalKm: {
      type: Number
    },
    totalImpact: {
      type: Number
    },
    treeToPlant: {
      type: Number
    },
    numberTel: {
      type: Number
    }
  },
  results: [{
    type: schema.Types.ObjectId,
    ref: 'result'
  }]
})

/**
 * hashPassword. Hash Password user.
 * @param {string} password - Contains password user.
 * @returns {string} Return a password hashed with bcrypt.
 */

userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  } catch (error) {
    throw error
  }
}

/**
 * comparePassword. Verify user password authenticity frontend/backend.
 * @param {string} password - Contains password user.
 */

// compare password of the database with input form
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
