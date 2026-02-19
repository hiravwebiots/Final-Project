const express = require('express')
const {  loginUser, sendOtp, verifyOtp, forgotPassword } = require('../controller/login')
const routes = express()

routes.post('/', loginUser)
routes.post('/sendotp', sendOtp)
routes.post('/verifyotp', verifyOtp)
routes.post('/forgotpassword', forgotPassword)

module.exports = routes