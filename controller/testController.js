const userModel = require('../model/userModel')
const roleModel = require('../model/roleModel')

const createU = async (req, res) => {
    try{

        console.log("req.body : ", req.body);
        

        const add = new userModel(req.body)
        const user = await add.save()

        // EJS ---> render & POSTMAN ---> send or json
        console.log("user : ", user);
        
        res.render('cre', { user }) // For EJS
    } catch(err){
        res.status(500).send(err.message)
    }
}

const showForm = async (req, res) => {
    const roles = await roleModel.find()
    res.render('cre', { roles })
}

module.exports = { createU }