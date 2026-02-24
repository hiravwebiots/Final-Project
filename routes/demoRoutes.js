const express = require('express')
const getejs = require('../controller/demoController')
const routes = express()

routes.get('/', getejs)

module.exports = routes