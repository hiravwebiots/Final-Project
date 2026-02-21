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

const readRolePermission = async (req, res) => {
    try{
        // =========== Read rolePermission ==============
        const read = await rolePermissionModel.find()
        res.status(200).send({ status : 0, message : 'get all rolePermission', data : read })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error while read rolePermission" })
    }
}

const readRoleAllPermissionById = async (req, res) => {
    try{
        // ========= Read rolePermission by id ==============
        const id = req.params.id
        const role = await roleModel.findById(id)

        if(!role){
            return res.status(500).send({ status : 0, message : "role not found" })
        }

        res.status(200).send({ status : 1, message : "role fetched permission", data : role })

    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error while read by id rolePermission" })
    }
}

const updateRolePermission = async (req, res) => {
    try{
        // ========== update rolePermission by id ============
        const rolePermissionId = req.params.id
        const { RoleId, PermissionId } = req.body

        // ===== checkRolePermission Exist =========
        const rolePer = await rolePermissionModel.findById(rolePermissionId)
        if(!rolePer){
            return res.status(500).send({ status : 0, message : "not found role has permission" })
        }

        // ======== both need ===============
        if(!RoleId || !PermissionId){
            return res.status(400).send({ status : 0, message : "roleId & permissionId is required" })
        }

        const role = await roleModel.findById(RoleId)
        if(!role){
            return res.status(404).send({ status : 0, message : "role not found" })
        }
        
        const permission = await permissionModel.findById(PermissionId)
        if(!permission){
            return res.status(404).send({ status : 0, message : "permission not found" })
        }

        // ======== update Object =============
        const updateData = {
            RoleId : req.body.RoleId || rolePer.RoleId,
            PermissionId : req.body.PermissionId || rolePer.PermissionId
        }

        // ============ update role & permission =========
        const updateRolePermission = await rolePermissionModel.findByIdAndUpdate(
            rolePermissionId,
            updateData,
            { new : true }
        )

        res.status(200).send({ status : 1, message : " update role or permission ", data : updateRolePermission })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error while updata rolePermission " })
    }
}

module.exports = { createRolePermission, readRolePermission, readRoleAllPermissionById, updateRolePermission }