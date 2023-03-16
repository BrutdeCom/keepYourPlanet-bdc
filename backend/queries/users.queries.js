const User = require('../database/models/user.model')
const { defineVehicle } = require('../config/user.config')

/**
 * getUsers. Get user and return object with user datas
 * @param {} -
 * @returns {object} User datas.
 */

exports.getUsers = () => {
  return User.find({}).exec()
}

/**
 * addUser. Add new user in database.
 * @param {object} body - Contains user datas email, password and username.
 * @returns {object} User datas.
 */

exports.addUser = async (body) => {
  try {
    const hashedPassword = await User.hashPassword(body.password)
    const newUser = new User({
      email: body.email,
      password: hashedPassword,
      username: body.username,
      role: 'user'
    })

    return newUser.save()
  } catch (error) {
    throw error
  }
}

/**
 * changePassword. Edit password user in database.
 * @param {string} newPassword - New user password
 * @returns {object} New hashed password user.
 */

exports.changePassword = async (newPassword, user) => {
  try {
    const hashedPassword = await User.hashPassword(newPassword)
    const { username } = user
    await User.updateOne({ username },
      {
        password: hashedPassword
      })
  } catch (error) {
    throw error
  }
}

// UPDATES AFTER ADD EVALUATION

/**
 * updateTotalKmUser. Increment globalData user in database after add new evaluation.
 * @param {object} evaluation - Evaluation datas
 * @param {string} userID - ID user
 * @returns {object} Update user datas (increment globalDatas) in database with datas of new evaluation.
 */

exports.updateTotalKmUser = async (evaluation, userID) => {
  try {
    return await User.updateOne({ _id: userID }, {
      $inc:
      {
        'globalData.totalKm': evaluation.itinerary.numberKm,
        'globalData.totalImpact': evaluation.impact,
        'globalData.treeToPlant': evaluation.equivalents.treeToPlant,
        'globalData.numberTel': evaluation.equivalents.numberTel
      }
    })
  } catch (error) {
    throw error
  }
}

/**
 * updateVehicle. Update user vehicle datas in database.
 * @param {object} payload - Vehicle datas
 * @param {string} userID - ID user
 * @returns {object} Update user vehicle datas in database with datas of new vehicle.
 */

exports.updateVehicle = async (payload, userID) => {
  try {
    const emission = await defineVehicle(payload)
    return await User.updateOne({ _id: userID }, {
      $set:
      {
        'vehicle.carburant': payload.fuelType,
        'vehicle.emission': emission,
        'vehicle.year': payload.yearVehicle
      }
    })
  } catch (error) {
    throw error
  }
}

/**
 * deleteUserById. Delete user in database.
 * @param {string} userID - ID user
 * @returns {object} Delete user datas in database.
 */

exports.deleteUserById = async (idUser) => {
  try {
    return User.findByIdAndDelete({ _id: idUser }).exec()
  } catch (error) {
    throw error
  }
}

/**
 * updateUserById. Update user in database.
 * @param {object} payload - ID user
 * @returns {object} Update user datas in database.
 */

exports.updateUserById = async (payload) => {
  try {
    const userID = payload._id
    return await User.updateOne({ _id: userID }, {
      $set:
      {
        email: payload.email,
        username: payload.username,
        role: payload.role
      }
    })
  } catch (error) {
    throw error
  }
}

/*
 * updateVehicleRegistration. Update user vehicle datas in database with coresponding registration api datas.
 * @param {object} payload - Vehicle datas
 * @param {string} userID - ID user
 * @returns {object} Update user vehicle datas in database with datas of new vehicle.
 */

exports.updateVehicleRegistration = async (payload, userID) => {
  try {
    let emission = payload.ExtendedData.Co2
    if (payload.ExtendedData.Co2 === '' || !payload.ExtendedData.Co2) {
      const vehicleDatas = {
        yearVehicle: Number.parseInt(payload.ExtendedData.anneeSortie),
        fuelType: payload.FuelType.CurrentTextValue
      }

      emission = await defineVehicle(vehicleDatas)
    }
    return await User.updateOne({ _id: userID }, {
      $set:
      {
        'vehicle.marque': payload.CarMake.CurrentTextValue,
        'vehicle.model': payload.CarModel.CurrentTextValue,
        'vehicle.year': payload.ExtendedData.anneeSortie,
        'vehicle.carburant': payload.FuelType.CurrentTextValue,
        'vehicle.emission': emission
      }
    })
  } catch (error) {
    throw error
  }
}
