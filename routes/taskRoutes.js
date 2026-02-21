const express = require('express')
const { createTask, getTask, updateTask, deleteTask } = require('../controller/task')
const { checkAuthentication, checkRoleAuthorization }  = require('../middleware/auth')
const checkPermission = require('../middleware/checkPermission')
const routes = express()

routes.post('/add', checkAuthentication, checkPermission('create_task'), createTask)
routes.get('/get', checkAuthentication, checkPermission('view_task'), getTask)
routes.put('/update/:id', checkAuthentication, checkPermission('update_task'), updateTask)
routes.delete('/delete/:id', checkAuthentication, checkRoleAuthorization('delete_task'), deleteTask)

module.exports = routes