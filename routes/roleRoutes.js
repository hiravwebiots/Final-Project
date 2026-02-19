const express = require('express')
const { createRole } = require('../controller/role')
const routes = express()

routes.post('/create', createRole)

module.exports = routes