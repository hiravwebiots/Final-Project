const express = require('express')
const { createRolePermission, readRolePermission, readRoleAllPermissionById, updateRolePermission } = require('../controller/rolePermissionController')
const routes = express()

routes.post('/create', createRolePermission)
routes.get('/read/', readRolePermission)
routes.get('/read/:id', readRoleAllPermissionById)
routes.put('/update/:id', updateRolePermission)


module.exports = routes