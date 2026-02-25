const express = require('express')
const {  loginUser, sendOtp, verifyOtp, forgotPassword } = require('../controller/login')
const { checkAuthentication } = require('../middleware/auth')
const routes = express.Router()

// Show Login Page EJS
routes.get('/', (req, res) => {
    res.render('pages/login')
})

// Login API
routes.post('/', loginUser)

routes.get('/dashboard', (req, res) => {
    res.render('pages/dashboard')
}) 

// OTP 
routes.post('/sendotp', sendOtp)
routes.post('/verifyotp', verifyOtp)
routes.post('/forgotpassword', forgotPassword)

module.exports = routes