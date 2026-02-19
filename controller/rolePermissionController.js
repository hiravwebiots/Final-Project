const rolePermissionModel = require('../model/rolePermissionModel')
const roleModel = require('../model/roleModel')
const permissionModel = require('../model/permissionModel')

const createRolePermission = async (req, res) => {
    try{
        const { RoleId, PermissionId } = req.body

        // ===== Validate RoleId ======
        if(!RoleId){
            return res.status(500).send({ status : 0, message : "role is required"})
        }

        const role = await roleModel.findById(RoleId)
        if(!role){
            return res.status(404).send({ status : 0, message : "role not found" })
        }
        
        // ===== Validate PermissionId ======        
        if(!PermissionId){
            return res.status(500).send({ status : 0, message : "permission is required" })
        }

        const permission = await permissionModel.findById(PermissionId)
        if(!permission){
            return res.status(404).send({ status : 0, message : "permission not found" })
        }

        const exist = await rolePermissionModel.findOne({
            RoleId,
           PermissionId
        })
        if(exist){
            return res.status(400).send({ status : 0, message : "Already Exist!" })
        }

        // =========== Saved Role has Permission ========= 
        const assignPermission = new rolePermissionModel(req.body) 
        const savedRolePermission = await assignPermission.save()

        res.status(201).send({ status : 1, message : "rolePermission Created", data : savedRolePermission})

    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error while create rolePermission" })
    }
}

module.exports = { createRolePermission }