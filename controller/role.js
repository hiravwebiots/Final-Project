const roleModel = require('../model/roleModel')
const permissionModel = require('../model/permissionModel')

const createRole = async (req, res) => {
    try{
        let { name, permissions } = req.body

        // ======== role name required ========
        if(!name){
            return res.status(500).send({ status : 0, message :  'role name is required' })
        }
        name = name.toLowerCase()
        
        // ======== Check duplicate role name ======
        const existRole = await roleModel.findOne({ name }) 
        if(existRole){
            return res.status(400).send({ status : 0, message : "this name alredy exist" })
        }

        
        if(!permissions){
            return res.status(400).send({ status : 0, message : "permission is requires" })
        }

        

        


    } catch(err){

    }


}

module.exports = { createRole }