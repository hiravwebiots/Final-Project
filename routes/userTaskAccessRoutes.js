const express = require('express')
const { getTaskbyUser, updateTaskbyUser } = require('../controller/userAccessTask')
const { checkAuthentication, checkRoleAuthorization } = require('../middleware/auth')
const routes = express()

// user login after check the task
routes.get('/assigned', checkAuthentication, checkRoleAuthorization('emplyoee'), getTaskbyUser)

// update only status of task
// Enter here Authentication to User login then after acess that
routes.put('/status/:id', checkAuthentication, checkRoleAuthorization('emplyoee'), updateTaskbyUser)

module.exports = routes