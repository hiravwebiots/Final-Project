const express = require('express')
const sendMail = require('../controller/emailSend')
const routes = express()

routes.post('/send', sendMail)