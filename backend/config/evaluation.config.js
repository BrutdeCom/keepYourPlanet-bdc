const axios = require('axios')
require('dotenv').config()

/**
 * Google API Key
 * @type {string}
 */

const googleApiKey = process.env.GOOGLE_API_KEY

/**
 * Request Google Directions API.
 * @param {object} itinerary - Contains start and arrival for calculate itinerary.
 * @returns {object} Return a object data with result itinerary.
 */

const getGoogle = (itinerary) => {
  const { start, arrival } = itinerary
  const uri = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${arrival}&alternatives=true&key=${googleApiKey}`
  return axios.post(encodeURI(uri))
    .then(res => { return res.data })
    .catch(error => console.log(error))
}

/**
 * Converted distance meter in kilometers.
 * @param {number} distance - Contains distance for itinerary in meter.
 * @returns {string} Return distance in kilometers.
 */

const calculNumberKm = (distance) => {
  try {
    if (!distance) {
      return 0
    }
    return (distance / 1000).toFixed(2)
  } catch (error) {
    throw error
  }
}

/**
 * Calcul impact for one itinerary. Multiplies distance with emission.
 * @param {number} distance - Contains distance for itinerary in meter.
 * @param {number} emission - Contains emission CO2, g/km.
 * @returns {string} Return total impact of itinerary.
 */

const calculImpact = async (distance, emission) => {
  try {
    let totalImpact = 0
    if (!distance || !emission) {
      return totalImpact
    }
    const distanceKm = await calculNumberKm(distance)
    totalImpact = distanceKm * (emission / 1000)
    return totalImpact.toFixed(2)
  } catch (error) {
    throw error
  }
}

/**
 * Calculate the equivalent of the impact in planted trees.
 * @param {number} distance - Contains distance for itinerary in meter.
 * @param {number} emission - Contains emission CO2, g/km.
 * @returns {string} Return equivalent in planted trees.
 */

const calculTreeToPlant = async (distance, emission) => {
  // 1 tree = 25kg CO2
  try {
    if (!distance || !emission) {
      return 0
    }
    const impact = await calculImpact(distance, emission)
    const treeToPlant = impact / 25
    return treeToPlant.toFixed(2)
  } catch (error) {
    throw error
  }
}

/**
 * Calculate the equivalent of the impact in manufactured smartphones.
 * @param {number} distance - Contains distance for itinerary in meter.
 * @param {number} emission - Contains emission CO2, g/km.
 * @returns {string} Return equivalent in manufactured smartphones.
 */

const calculNumberTel = async (distance, emission) => {
  // 1 smartphone = 75kg co2
  try {
    if (!distance || !emission) {
      return 0
    }
    const impact = await calculImpact(distance, emission)
    const numberTel = impact / 75
    return numberTel.toFixed(2)
  } catch (error) {
    throw error
  }
}

/**
 * Generate object data for one user itinerary evaluation.
 * @param {object} body - Contains distance and emission for itinerary.
 * @returns {object} Return object with datas for evaluations.
 */

const calculResult = async (body) => {
  const { distance, emission } = body
  try {
    const numberKm = await calculNumberKm(distance)
    const impact = await calculImpact(distance, emission)
    const treeToPlant = await calculTreeToPlant(distance, emission)
    const numberTel = await calculNumberTel(distance, emission)

    /**
 * Result
 * @typedef {Object} result
 * @property {number} distance - Distance itinerary in kilometers
 * @property {number} impact - Impact itinerary in Kg/CO2
 * @property {number} treeToPlant - Equivalent impact in planted trees
 * @property {number} numberTel - Equivalent impact in manufactured smartphones
 */

    const result = {
      distance: numberKm,
      impact: impact,
      treeToPlant: treeToPlant,
      numberTel: numberTel
    }
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  calculImpact,
  calculNumberKm,
  calculNumberTel,
  calculResult,
  calculTreeToPlant,
  getGoogle
}
