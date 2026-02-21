const express = require('express')
const { getTaskbyUser, updateTaskbyUser } = require('../controller/userAccessTask')
const { checkAuthentication } = require('../middleware/auth')
const checkPermission = require('../middleware/checkPermission')
const routes = express()

// user login after check the task
routes.get('/assigned', checkAuthentication, checkPermission('view_task'), getTaskbyUser)

// update only status of task
// Enter here Authentication to User login then after acess that
routes.put('/status/:id', checkAuthentication, checkPermission('update_task'), updateTaskbyUser)

module.exports = routes