const { verifyUsername, verifyEmail, verifyPassword, findUserPerUsername, findUserPerEmail } = require('../config/security.config')
const expect = require('chai').expect

/* eslint-disable no-undef */

describe('config/security.config.js', function () {
  describe('verifyUsername', function () {
    const username = 'Stéphane'

    it('should be a function', function () {
      expect(verifyUsername).to.be.a('function')
    })

    it('should be a string parameter', function () {
      expect(username).to.be.a('string')
    })

    it('should be return a boolean', function () {
      expect(verifyUsername(username)).to.be.a('boolean')
    })

    it('should be return a false value', function () {
      const username1 = 'Sté'
      const username2 = ''
      const username3 = 'Jean-charles-dominique'

      expect(verifyUsername(username1)).be.equal(false)
      expect(verifyUsername(username2)).be.equal(false)
      expect(verifyUsername(username3)).be.equal(false)
      expect(verifyUsername(null)).be.equal(false)
    })

    it('should be return a true value', function () {
      expect(verifyUsername(username)).be.equal(true)
    })
  })

  describe('verifyEmail', function () {
    const email = 'stephane@stephane.fr'

    it('should be a function', function () {
      expect(verifyEmail).to.be.a('function')
    })

    it('should be a string parameter', function () {
      expect(email).to.be.a('string')
    })

    it('should be return a boolean', function () {
      expect(verifyEmail(email)).to.be.a('boolean')
    })

    it('should be return a false value', function () {
      const email1 = 'Sté'
      const email2 = 'steph@fr'
      const email3 = ''

      expect(verifyEmail(email1)).be.equal(false)
      expect(verifyEmail(email2)).be.equal(false)
      expect(verifyEmail(email3)).be.equal(false)
      expect(verifyEmail(null)).be.equal(false)
    })

    it('should be return a true value', function () {
      expect(verifyEmail(email)).be.equal(true)
    })
  })

  describe('verifyPassword', function () {
    const password = 'Password123456789*'

    it('should be a function', function () {
      expect(verifyPassword).to.be.a('function')
    })

    it('should be a string parameter', function () {
      expect(password).to.be.a('string')
    })

    it('should be return a boolean', function () {
      expect(verifyPassword(password)).to.be.a('boolean')
    })

    it('should be return a false value', function () {
      const password1 = 'Sté'
      const password2 = 'Password78546*'
      const password3 = ''

      expect(verifyPassword(password1)).be.equal(false)
      expect(verifyPassword(password2)).be.equal(false)
      expect(verifyPassword(password3)).be.equal(false)
      expect(verifyPassword(null)).be.equal(false)
    })

    it('should be return a true value', function () {
      expect(verifyPassword(password)).be.equal(true)
    })
  })

  describe('findUserPerUsername', function () {
    const username = 'stephane.vvr'

    it('should be a function', function () {
      expect(findUserPerUsername).to.be.a('function')
    })

    it('should be a string parameter', function () {
      expect(username).to.be.a('string')
    })

    // TODO: Test find user per username request in MongoDB
  })

  describe('findUserPerEmail', function () {
    const email = 'stephane@stephane.fr'

    it('should be a function', function () {
      expect(findUserPerEmail).to.be.a('function')
    })

    it('should be a string parameter', function () {
      expect(email).to.be.a('string')
    })

    // TODO: Test find user per email request in MongoDB
  })
})
