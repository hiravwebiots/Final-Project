const express = require('express')
const { getTaskbyUser, updateTaskbyUser } = require('../controller/userAccessTask')
const { checkAuthentication } = require('../middleware/auth')
const routes = express()

// user login after check the task
routes.get('/assigned', checkAuthentication, getTaskbyUser)

// update only status of task
// Enter here Authentication to User login then after acess that
routes.put('/status/:id', checkAuthentication, updateTaskbyUser)

module.exports = routes