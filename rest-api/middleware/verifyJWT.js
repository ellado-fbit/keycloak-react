const jwt = require('jsonwebtoken')

const verifyJWT = (props) => {
  return (req, res, next) => {

    const { cert } = props
    let token = null

    try {
      if (!cert) throw new Error(`'cert' parameter is required`)

      if (req.query.token) token = req.query.token.trim()
      if (req.headers.authorization) token = req.headers.authorization.replace('Bearer ', '').trim()
      if (!token) throw new Error('Token is required')

    } catch (error) {
      error.message = `[verifyJWT] ${error.message}`
      return next(error)
    }

    jwt.verify(token, cert, (err, tokenPayload) => {
      try {
        if (err) throw new Error(err.message)

        req.tokenPayload = tokenPayload
        return next()

      } catch (error) {
        error.message = `[verifyJWT] ${error.message}`
        return next(error)
      }
    })

  }
}

module.exports = verifyJWT
