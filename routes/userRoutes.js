const express = require('express')
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controller/user')
const { checkAuthentication, checkRoleAuthorization } = require('../middleware/auth')
const uploadImage = require('../middleware/uploadImage')
const checkPermission = require('../middleware/checkPermission')
const routes = express()

routes.post("/add", checkAuthentication, checkPermission('create_user'), uploadImage, createUser)
routes.get('/get', checkAuthentication, checkPermission('view_user'), getUsers)
routes.get('/get/:id', checkAuthentication, checkPermission('view_user'), getUserById)
routes.put('/update/:id', checkAuthentication, checkPermission('update_user'), uploadImage, updateUser)
routes.delete('/delete/:id', checkAuthentication, checkPermission('delete_user'), deleteUser)

module.exports = routes