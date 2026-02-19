const express = require('express')
const routes = express()
const createTemplate = require('../controller/emailTemplate')

routes.post('/create', createTemplate)

module.exports = routes