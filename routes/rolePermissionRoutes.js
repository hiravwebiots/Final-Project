const express = require('express')
const { createRolePermission } = require('../controller/rolePermissionController')
const routes = express()

routes.post('/create', createRolePermission)


module.exports = routes