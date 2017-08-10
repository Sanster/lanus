var _jwt = require('jsonwebtoken')

var token = _jwt.sign({ foo: 'bar' }, 'shhhhh')

const jwt = {}

module.exports = jwt
