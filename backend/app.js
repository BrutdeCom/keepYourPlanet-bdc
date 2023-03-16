const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 8000
const index = require('./routes')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
require('./database')

exports.app = app

require('./config/passport.config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(index)

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
  })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
