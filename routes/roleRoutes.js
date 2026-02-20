const express = require('express')
const { createRole, readAllRole, updateRole, deleteRole } = require('../controller/role')
const { checkAuthentication, checkRoleAuthorization } = require('../middleware/auth')
const routes = express()

routes.post('/create', checkAuthentication, checkRoleAuthorization('admin'), createRole)
routes.get('/read', checkAuthentication, checkRoleAuthorization('admin'), readAllRole)
routes.put('/update/:id', checkAuthentication, checkRoleAuthorization('admin'), updateRole)
routes.delete('/delete/:id', checkAuthentication, checkRoleAuthorization('admin'), deleteRole)

module.exports = routes