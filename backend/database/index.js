const mongoose = require('mongoose')
require('dotenv').config()

/**
 * MongoDB database URL
 * @type {string}
 */

const url = process.env.MONGODB_URI

// Connexion a la DB distante

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connection ok')
}).catch(error => {
  console.log('error connexion', error)
})

// MOCK DATA

// const { insertUserDatas } = require('../datas/userData')
// insertUserDatas()

// MOCK DATA
