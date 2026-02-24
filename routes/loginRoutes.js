const express = require('express')
const {  loginUser, sendOtp, verifyOtp, forgotPassword } = require('../controller/login')
const routes = express.Router()

// Show Login Page EJS
routes.get('/', (req, res) => {
    res.render('login')
})

// Login API
routes.post('/', loginUser)

// OTP 
routes.post('/sendotp', sendOtp)
routes.post('/verifyotp', verifyOtp)
routes.post('/forgotpassword', forgotPassword)

module.exports = routes