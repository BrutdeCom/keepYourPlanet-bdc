const { reducerDatas, filterMonthImpact, defineVehicle } = require('../config/user.config')
const expect = require('chai').expect

/* eslint-disable no-undef */

describe('config/user.config.js', function () {
  describe('reducerDatas', function () {
    const payload = [
      {
        equivalents: {
          treeToPlant: 54,
          numberTel: 12
        },
        impact: 324,
        itinerary: {
          numberKm: 765
        }
      },
      {
        equivalents: {
          treeToPlant: 21.1,
          numberTel: 12
        },
        impact: 324,
        itinerary: {
          numberKm: 765
        }
      }
    ]

    const path = 'equivalents.treeToPlant'

    it('should be a function', function () {
      expect(reducerDatas).to.be.a('function')
    })
    it('should be a parameter array of objects payload', function () {
      expect(payload).to.be.a('array')
    })
    it('should be a total value', function () {
      expect(reducerDatas(payload, path)).be.equal('75.10')
    })
  })

  describe('filterMonthImpact', function () {
    const payload = [
      {
        equivalents: {
          treeToPlant: 54,
          numberTel: 12
        },
        impact: 324,
        monthDate: '08',
        itinerary: {
          numberKm: 765
        }
      },
      {
        equivalents: {
          treeToPlant: 21.1,
          numberTel: 12
        },
        impact: 231,
        monthDate: '08',
        itinerary: {
          numberKm: 765
        }
      }
    ]

    const path = 'impact'
    const filter = { monthDate: '08' }

    it('should be a function', function () {
      expect(filterMonthImpact).to.be.a('function')
    })
    it('should be a parameter array of objects payload', function () {
      expect(payload).to.be.a('array')
      expect(payload).length(2)
      expect(payload[0].impact).to.be.a('number').eq(324)
      expect(payload[1].impact).to.be.a('number').eq(231)
      expect(payload[0].monthDate).to.be.a('string').eq('08')
      expect(payload[1].monthDate).to.be.a('string').eq('08')
    })
    it('should be a total value', function () {
      expect(filterMonthImpact(payload, filter, path)).be.equal('555.00')
    })
    it('should be a 0 value', function () {
      expect(filterMonthImpact(payload, { monthDate: '01' }, path)).be.equal('0')
      expect(filterMonthImpact([], { monthDate: '01' }, path)).be.equal('0')
    })
  })

  describe('defineVehicle', function () {
    const vehicleDatas = {
      yearVehicle: 2000,
      fuelType: 'ESSENCE'
    }

    const vehicleDatas2 = {
      yearVehicle: 2010,
      fuelType: 'DIESEL'
    }

    const vehicleDatas3 = {
      yearVehicle: 2008,
      fuelType: 'Essence'
    }

    const vehicleDatas4 = {
      yearVehicle: 1999,
      fuelType: 'Diesel'
    }

    it('should be a function', function () {
      expect(defineVehicle).to.be.a('function')
    })

    it('should be a parameter array of objects vehicleDatas', function () {
      expect(vehicleDatas).to.be.a('object')
      expect(vehicleDatas.yearVehicle).to.be.a('number').eq(2000)
      expect(vehicleDatas.fuelType).to.be.a('string').eq('ESSENCE')
    })

    it('should be a parameter array of objects vehicleDatas2', function () {
      expect(vehicleDatas2).to.be.a('object')
      expect(vehicleDatas2.yearVehicle).to.be.a('number').eq(2010)
      expect(vehicleDatas2.fuelType).to.be.a('string').eq('DIESEL')
    })

    it('should be a parameter array of objects vehicleDatas3', function () {
      expect(vehicleDatas3).to.be.a('object')
      expect(vehicleDatas3.yearVehicle).to.be.a('number').eq(2008)
      expect(vehicleDatas3.fuelType).to.be.a('string').eq('Essence')
    })

    it('should be a parameter array of objects vehicleDatas4', function () {
      expect(vehicleDatas4).to.be.a('object')
      expect(vehicleDatas4.yearVehicle).to.be.a('number').eq(1999)
      expect(vehicleDatas4.fuelType).to.be.a('string').eq('Diesel')
    })

    it('should be a corresponding emission value', async function () {
      const test = await defineVehicle(vehicleDatas)
      const test2 = await defineVehicle(vehicleDatas2)
      const test3 = await defineVehicle(vehicleDatas3)
      const test4 = await defineVehicle(vehicleDatas4)

      expect(test).be.equal(168)
      expect(test2).be.equal(130)
      expect(test3).be.equal(141)
      expect(test4).be.equal(161)
    })
  })
})
