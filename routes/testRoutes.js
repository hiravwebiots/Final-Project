const express = require('express')
const { createU, showForm} = require('../controller/testController')
const routes = express()

routes.post('/', createU)
// routes.get('/', showForm)

module.exports = routes

