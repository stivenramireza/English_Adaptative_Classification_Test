const jwt = require("jwt-simple")
const moment = require('moment')
const db = require("../db")

function createToken(user){
    const payload = {
        sub: user.username, 
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }
    return jwt.encode(payload, db.SECRET_TOKEN)
}

function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, db.SECRET_TOKEN)
        if (payload.exp <= moment().unix()) {
          reject({
            status: 401,
          })
        }
        resolve(payload.sub)
      } catch (err) {
        reject({
          status: 500,
          message: 'Invalid Token',
          err: err
        })
      }
    })
    return decoded
  }

module.exports = {
  createToken, 
  decodeToken
}
