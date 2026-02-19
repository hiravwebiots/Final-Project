const roleModel = require('../model/roleModel')

const createRole = async (req, res) => {
    try{
        let { name, description } = req.body

        // ======== role name required ========
        if(!name){
            return res.status(500).send({ status : 0, message :  'role name is required' })
        }
        
        // ======== Check duplicate role name ======
        const existRole = await roleModel.findOne({ name }) 
        if(existRole){
            return res.status(400).send({ status : 0, message : "this name alredy exist" })
        }

        const createrole = new roleModel(req.body)
        const role = await createrole.save()

        res.status(201).send({ status : 1, message : "Role Created Successfully", data : role})
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error while create role", data : err })
    }
}

module.exports = { createRole }