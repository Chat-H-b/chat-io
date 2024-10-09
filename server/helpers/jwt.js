const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY


//encode atau encrypt
const signToken = (payload) => {
    return jwt.sign(payload, secretKey)
}

//decode atau decrypt
const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { signToken, verifyToken }