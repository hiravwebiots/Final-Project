const express = require('express')
const { createTask, getTask, updateTask, deleteTask } = require('../controller/task')
// const taskValidation = require('../middleware/taskValidation')
const { checkAuthentication, checkRoleAuthorization }  = require('../middleware/auth')
const routes = express()

routes.post('/add', checkAuthentication, checkRoleAuthorization('admin'), createTask)
routes.get('/get', checkAuthentication, checkRoleAuthorization('admin'), getTask)
routes.put('/update/:id', checkAuthentication, checkRoleAuthorization('admin'), updateTask)
routes.delete('/delete/:id', checkAuthentication, checkRoleAuthorization('admin'), deleteTask)



module.exports = routes