const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { verifyJWT } = require('./middleware')
const fs = require('fs')

const cert = fs.readFileSync(`${__dirname}/cert.pem`, 'UTF-8')
const serverPort = 5000

const main = async () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(cors())

  app.get('/', (req, res) => {
    res.status(200).json({ endpoints: [`http://localhost:${serverPort}/species`] })
  })

  app.get('/species',
    verifyJWT({ cert }),
    (req, res) => {
      res.status(200).json({ birds: ['ropit', 'tord', 'mèl·lera'] })
    }
  )

  app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.toString())
  })

  app.listen(serverPort, () => { console.log(`Server running on http://localhost:${serverPort}`) })
}

main()
