const { getGoogle, calculNumberKm, calculImpact, calculTreeToPlant, calculNumberTel, calculResult } = require('../config/evaluation.config')
const expect = require('chai').expect

/* eslint-disable no-undef */

describe('config/evaluation.config.js', function () {
  const itinerary = {
    start: 'Bordeaux',
    arrival: 'Bayonne'
  }

  describe('getGoogle', function () {
    it('should be a function', function () {
      expect(getGoogle).to.be.a('function')
    })
    it('should be a parameter object itinerary', function () {
      expect(itinerary).to.be.a('object')
    })
    it('should be have two property for object itinerary', function () {
      expect(itinerary).has.property('start').eq('Bordeaux')
      expect(itinerary).has.property('arrival').eq('Bayonne')
      expect(itinerary.start).to.be.a('string')
      expect(itinerary.arrival).to.be.a('string')
    })

    // TODO: test axios request
  })

  describe('calculNumberKm', function () {
    const distance = 150
    it('should be a function', function () {
      expect(calculNumberKm).to.be.a('function')
    })
    it('should be a number parameter', function () {
      expect(distance).to.be.a('number')
    })
    it('should be a round value', function () {
      expect(calculNumberKm(distance)).be.equal('0.15')
      expect(calculNumberKm(1200)).be.equal('1.20')
      expect(calculNumberKm(12453)).be.equal('12.45')
      expect(calculNumberKm(247)).be.equal('0.25')
      expect(calculNumberKm(null)).be.equal(0)
    })
  })

  describe('calculImpact', function () {
    const distance = 150
    const emission = 128
    it('should be a function', function () {
      expect(calculImpact).to.be.a('function')
    })
    it('should be a number parameter', function () {
      expect(distance).to.be.a('number')
      expect(emission).to.be.a('number')
    })
    it('should be a round value', async function () {
      const test = await calculImpact(150, 128)
      const test2 = await calculImpact(1200, 234)
      const test3 = await calculImpact(12453, 90)
      const test4 = await calculImpact(247, 167)
      const test5 = await calculImpact(null, null)

      expect(test).be.equal('0.02')
      expect(test2).be.equal('0.28')
      expect(test3).be.equal('1.12')
      expect(test4).be.equal('0.04')
      expect(test5).be.equal(0)
    })
  })

  describe('calculTreeToPlant', function () {
    const distance = 254
    const emission = 90
    it('should be a function', function () {
      expect(calculTreeToPlant).to.be.a('function')
    })
    it('should be a number parameter', function () {
      expect(distance).to.be.a('number')
      expect(emission).to.be.a('number')
    })
    it('should be a round value', async function () {
      const test = await calculTreeToPlant(150, 128)
      const test2 = await calculTreeToPlant(1200, 234)
      const test3 = await calculTreeToPlant(12453, 90)
      const test4 = await calculTreeToPlant(247, 167)
      const test5 = await calculTreeToPlant(null, null)

      expect(test).be.equal('0.00')
      expect(test2).be.equal('0.01')
      expect(test3).be.equal('0.04')
      expect(test4).be.equal('0.00')
      expect(test5).be.equal(0)
    })
  })

  describe('calculNumberTel', function () {
    const distance = 254
    const emission = 90
    it('should be a function', function () {
      expect(calculNumberTel).to.be.a('function')
    })
    it('should be a number parameter', function () {
      expect(distance).to.be.a('number')
      expect(emission).to.be.a('number')
    })
    it('should be a round value', async function () {
      const test = await calculNumberTel(150, 128)
      const test2 = await calculNumberTel(1200, 234)
      const test3 = await calculNumberTel(12453, 90)
      const test4 = await calculNumberTel(247, 167)
      const test5 = await calculNumberTel(null, null)

      expect(test).be.equal('0.00')
      expect(test2).be.equal('0.00')
      expect(test3).be.equal('0.01')
      expect(test4).be.equal('0.00')
      expect(test5).be.equal(0)
    })
  })

  describe('calculResult', function () {
    const body = {
      distance: 150,
      emission: 128
    }
    it('should be a function', function () {
      expect(calculResult).to.be.a('function')
    })
    it('should be a object parameter', function () {
      expect(body).to.be.a('object')
    })
    it('should be have two number property for object body', function () {
      expect(body).has.property('distance').eq(150)
      expect(body).has.property('emission').eq(128)
      expect(body.distance).to.be.a('number')
      expect(body.emission).to.be.a('number')
    })
    it('should be a return object whith four property', async function () {
      const test = await calculResult(body)

      expect(test).to.be.a('object')
      expect(test).has.property('distance').eq('0.15')
      expect(test).has.property('impact').eq('0.02')
      expect(test).has.property('treeToPlant').eq('0.00')
      expect(test).has.property('numberTel').eq('0.00')
      expect(test.distance).to.be.a('string')
      expect(test.impact).to.be.a('string')
      expect(test.numberTel).to.be.a('string')
      expect(test.treeToPlant).to.be.a('string')
    })
  })
})
