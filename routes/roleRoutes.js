const express = require('express')
const { createRole, deleteRole } = require('../controller/role')
const routes = express()

routes.post('/create', createRole)
routes.delete('/delete/:id', deleteRole)

module.exports = routes