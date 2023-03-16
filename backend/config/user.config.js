const _ = require('lodash')
const diesel = require('../datas/dieselData')
const essence = require('../datas/essenceData')

const axios = require('axios')
require('dotenv').config()

const username = process.env.REGISTRATION_API_KEY

/**
 * Request Registration Vehicle API.
 * @param {string} registration - Contains registration vehicle.
 * @returns {object} Return a object vehicle datas.
 */

const getImmatApi = (registration) => {
  const uri = `http://www.immatriculationapi.com/api/reg.asmx/CheckFrance?RegistrationNumber=${registration}&username=${username}`
  return axios.get(uri)
    .then(res => {
      return res.data
    })
    .catch(error => console.log(error))
}

/**
 * Define emission user vehicle by year and type of fuel.
 * @param {object} vehicleDatas - Contains vehicle datas.
 * @returns {number} Return emission.
 */

const defineVehicle = async (vehicleDatas) => {
  try {
    const vehicleYear = vehicleDatas.yearVehicle
    if (vehicleDatas.fuelType === 'Diesel' || vehicleDatas.fuelType === 'DIESEL') {
      const emission = _.get(diesel, vehicleYear)
      return emission
    }
    if (vehicleDatas.fuelType === 'Essence' || vehicleDatas.fuelType === 'ESSENCE') {
      const emission = _.get(essence, vehicleYear)
      return emission
    }
  } catch (error) {
    throw error
  }
}

/**
 * reducerDatas. Map object array and selected value of corresponding path, make array with all values, then return sum of array.
 * @param {object} payload - Contains object array.
 * @param {string} path - Contains path for get object in array.
 * @returns {number} Return sum of array.
 */

const reducerDatas = (payload, path) => {
  if (payload.length >= 1) {
    return (
      _.map(payload, path).reduce((a, b) => {
        return a + b
      }).toFixed(2)
    )
  }
}

/**
 * filterMonthImpact. Filter total impact per month in all results.
 * @param {object} payload required - Contains object array with results datas.
 * @param {object} filter required - Contains value of filter data.
 * @param {string} path required - Contains path for get object in array.
 * @returns {number} Return sum of array.
 */

const filterMonthImpact = (payload, filter, path) => {
  if (payload.length >= 1) {
    const datasFilter = _.filter(payload, filter)
    if (datasFilter.length >= 1) {
      return reducerDatas(datasFilter, path)
    }
    return '0'
  }
  return '0'
}

/**
 * Calculate user global datas. Add all user data result for calculate total of one year.
 * @param {array} results - Contain array with user results.
 * @returns {object} Return object with global datas.
 */

const calculateGlobalDataUser = async (results) => {
  try {
    const treeToPlant = await reducerDatas(results, 'equivalents.treeToPlant')
    const numberTel = await reducerDatas(results, 'equivalents.numberTel')
    const numberKm = await reducerDatas(results, 'itinerary.numberKm')
    const impact = await reducerDatas(results, 'impact')

    const globalData = {
      totalTreeToPlants: treeToPlant,
      totalNumberTel: numberTel,
      totalNumberKm: numberKm,
      totalImpact: impact,
      monthImpact: {
        janvier: filterMonthImpact(results, { monthDate: '01' }, 'impact'),
        février: filterMonthImpact(results, { monthDate: '02' }, 'impact'),
        mars: filterMonthImpact(results, { monthDate: '03' }, 'impact'),
        avril: filterMonthImpact(results, { monthDate: '04' }, 'impact'),
        mai: filterMonthImpact(results, { monthDate: '05' }, 'impact'),
        juin: filterMonthImpact(results, { monthDate: '06' }, 'impact'),
        juillet: filterMonthImpact(results, { monthDate: '07' }, 'impact'),
        aout: filterMonthImpact(results, { monthDate: '08' }, 'impact'),
        septembre: filterMonthImpact(results, { monthDate: '09' }, 'impact'),
        octobre: filterMonthImpact(results, { monthDate: '10' }, 'impact'),
        novembre: filterMonthImpact(results, { monthDate: '11' }, 'impact'),
        décembre: filterMonthImpact(results, { monthDate: '12' }, 'impact')
      }
    }
    return globalData
  } catch (error) {
    throw error
  }
}

module.exports = {
  reducerDatas,
  calculateGlobalDataUser,
  defineVehicle,
  filterMonthImpact,
  getImmatApi
}
