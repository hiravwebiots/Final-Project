const roleModel = require('../model/roleModel')
const rolePermissionModel = require('../model/rolePermissionModel')

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

const readAllRole = async (req, res) => {
    try{
        const readRoles = await roleModel.find()
        res.status(200).send({ status : 1, message : "Read all roles", data : readRoles })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error while read role", data : err })
    }
}

const updateRole = async (req, res) => {
    try{
        const roleId = req.params.id
        
        const checkRole = await roleModel.findById(roleId)
        if(!checkRole){
            return res.status(404).send({ stataus : 0, message : "role not found" })
        }

        // ======== role name required ========
        if(!name){
            return res.status(500).send({ status : 0, message :  'role name is required' })
        }

        // ======== Check duplicate role name ======
        const existRole = await roleModel.findOne({ name }) 
        if(existRole){
            return res.status(400).send({ status : 0, message : "this name alredy exist" })
        }

        const updateData = {
            name : req.body.name || name
        }            

        const updateRole = await roleModel.findByIdAndUpdate(
            roleId,
            updateData,
            { new : true }
        )  

        res.stataus(200).send({ status : 1, message : "update name of role", data : updateRole})
    } catch(err){   
        console.log(err);
        res.status(500).send({ status : 0, message : "error while update role", data : err})
    }
}

const deleteRole = async (req, res) => {
    try{
        const roleId = req.params.id
        const deleterole = await roleModel.findByIdAndDelete(roleId)
        
        if(!deleterole){
            res.status(404).send({ status : 0, message : "role not found" })
        }
        
        if(deleterole){
            const deleterolePermission = await rolePermissionModel.deleteMany({
                RoleId : roleId
            })
        }   
        res.status(200).send({ status : 1, message : "Delete role & rolepermission Successfully" })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error while delete role", data : err })

    }
}

module.exports = { createRole, readAllRole, updateRole, deleteRole }