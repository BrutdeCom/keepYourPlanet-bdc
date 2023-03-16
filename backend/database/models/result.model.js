const mongoose = require('mongoose')
const schema = mongoose.Schema

/**
 * @class resultSchema
 * @property {number} impact Impact of result
 * @property {string} itinerary.from Start address
 * @property {string} itinerary.to Destination address
 * @property {number} itinerary.numberKm Number km for itinerary
 * @property {string} vehicle.fuelType Fuel type for user vehicle
 * @property {number} vehicle.emission g/C02 emission for user vehicle
 * @property {number} equivalents.treeToPlant Equivalents planted trees for impact user
 * @property {number} equivalents.numberTel Equivalents manufactured smartphones for impact user
 * @property {string} user_id ID user
 * @property {String} yearDate Evaluation year date
 * @property {String} monthDate Evaluation month date
 * @property {String} dayDate Evaluation day date
 */

const resultSchema = schema({
  impact: {
    type: Number,
    required: true
  },
  itinerary: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    numberKm: {
      type: Number,
      required: true
    }
  },
  vehicle: {
    fuelType: {
      type: String,
      required: true
    },
    emission: {
      type: Number,
      required: true
    }
  },
  equivalents: {
    treeToPlant: {
      type: Number,
      required: true
    },
    numberTel: {
      type: Number,
      required: true
    }
  },
  user_id: {
    type: schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  yearDate: {
    type: String,
    required: true
  },
  monthDate: {
    type: String,
    required: true
  },
  dayDate: {
    type: String,
    required: true
  },
  dateEvaluation: {
    type: String,
    required: true
  }
})

const Result = mongoose.model('result', resultSchema)

module.exports = Result
