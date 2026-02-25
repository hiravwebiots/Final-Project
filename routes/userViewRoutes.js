const express = require('express')
const roleModel = require('../model/roleModel')

const router = express.Router()

router.get('/user', async (req, res) => {
    const roles = await roleModel.find()
    res.render('pages/user', { roles })
})

module.exports = router