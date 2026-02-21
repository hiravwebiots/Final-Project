const express = require('express')
const { createRolePermission, readRolePermission, readRoleAllPermissionById, updateRolePermission } = require('../controller/rolePermissionController')
const { checkAuthentication, checkRoleAuthorization } = require('../middleware/auth')
const routes = express()

routes.post('/create', checkAuthentication, checkRoleAuthorization('admin'), createRolePermission)
routes.get('/read/', checkAuthentication, checkRoleAuthorization('admin'), readRolePermission)
routes.get('/read/:id', checkAuthentication, checkRoleAuthorization('admin'), readRoleAllPermissionById)
routes.put('/update/:id', checkAuthentication, checkRoleAuthorization('admin'), updateRolePermission)

module.exports = routes