const Result = require('../database/models/result.model')
const { calculResult } = require('../config/evaluation.config')

/**
 * getResultByUserID.
 * @param {String} userID - User ID
 * @returns {object} Return a object with user results.
 */

exports.getResultByUserID = async (userID) => {
  return await Result.find({ user_id: userID }).exec()
}

/**
 * getResultByYearDate.
 * @param {String} userID - User ID
 * @returns {object} Return a object with user results for actual year.
 */

exports.getResultByYearDate = async (userID, year) => {
  return await Result.find({ user_id: userID, yearDate: year }).exec()
}

/**
 * getCurrentResult.
 * @param {string} evaluationId - Evaluation ID.
 * @returns {object} Return a object with evaluation data.
 */

exports.getCurrentResult = async (evaluationId) => {
  const currentEvaluation = await Result.findById({ _id: evaluationId }, (err, evaluation) => {
    if (err) {
      throw err
    }
    return evaluation
  })
  return currentEvaluation
}

/**
 * addEvaluation. Add new evaluation in database.
 * @param {object} body - Contains evaluation datas
 * @param {string} userID - User ID.
 * @returns {object} Return a object with evaluation data.
 */

exports.addEvaluation = async (body, userID) => {
  const { start, arrival, carburant, emission, yearDate, dayDate, monthDate, dateEvaluation } = body
  try {
    const result = await calculResult(body)
    const newEvaluation = new Result({
      impact: result.impact,
      itinerary: {
        from: start,
        to: arrival,
        numberKm: result.distance
      },
      vehicle: {
        fuelType: carburant,
        emission: emission
      },
      equivalents: {
        treeToPlant: result.treeToPlant,
        numberTel: result.numberTel
      },
      user_id: userID,
      yearDate: yearDate,
      dayDate: dayDate,
      monthDate: monthDate,
      dateEvaluation: dateEvaluation

    })
    return newEvaluation.save()
  } catch (error) {
    throw error
  }
}
