const express = require('express')
const routes = express()
const { createTemplate, readTemplate, updateTemplate, deleteTemplate } = require('../controller/emailTemplate')
const { checkAuthentication, checkRoleAuthorization } = require('../middleware/auth')

routes.post('/create', checkAuthentication, checkRoleAuthorization('admin'), createTemplate)
routes.get('/read', checkAuthentication, checkRoleAuthorization('admin'), readTemplate)
routes.put('/update/:id', checkAuthentication, checkRoleAuthorization('admin'), updateTemplate)
routes.delete("/delete/:id", checkAuthentication, checkRoleAuthorization('admin'), deleteTemplate)

module.exports = routes