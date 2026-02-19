const express = require('express')
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controller/user')
const { checkAuthentication, checkRoleAuthorization } = require('../middleware/auth')
const uploadImage = require('../middleware/uploadImage')
const routes = express()

routes.post("/add", checkAuthentication, checkRoleAuthorization('admin'), uploadImage, createUser)
routes.get('/get', checkAuthentication, checkRoleAuthorization('admin'), getUsers)
routes.get('/get/:id', checkAuthentication, checkRoleAuthorization('admin'), getUserById)
routes.put('/update/:id', checkAuthentication, checkRoleAuthorization('admin'), uploadImage, updateUser)
routes.delete('/delete/:id', checkAuthentication, checkRoleAuthorization('admin'), deleteUser)

module.exports = routes