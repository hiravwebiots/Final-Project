const mongoose = require('mongoose')
const rolePermissionModel = require('../model/rolePermissionModel')
const roleModel = require('../model/roleModel')
const permissionModel = require('../model/permissionModel')

const createRolePermission = async (req, res) => {
    try{
        const { RoleId, PermissionId } = req.body

        // ===== Validate RoleId ======
        if(!RoleId){
            return res.status(500).send({ status : 0, message : "role id is required"})
        }

        const role = await roleModel.findById(RoleId)
        if(!role){
            return res.status(404).send({ status : 0, message : "role not found" })
        }
        console.log("role : ", role);
        

        // ===== Validate PemissionId ======
        if(!PermissionId){
            return res.status(500).send({ status : 0, message : "prmission id is required" })
        }

        console.log("PermissionId : ", PermissionId);

        const permission = await permissionModel.findById([PermissionId])
        console.log('permission : ', permission);
        if(!permission){
            return res.status(404).send({ status : 0, message : "permission not found" })
        }


        // =========== Saved Role has Permission ========= 
        const assignPermission = new rolePermissionModel(req.body) 
        const savedROlePermission = await assignPermission.save()
        console.log("ROle-Permission : ", savedROlePermission);

        res.status(201).send({ status : 1, message : "rolePermission Created", data : savedROlePermission})

    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error while create rolePermission" })
    }
}

module.exports = { createRolePermission }