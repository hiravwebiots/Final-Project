// const permissionModel = require('../model/permissionModel')

// // ========== Create Permission ========= 
// const createPermission = async (req, res) => {
//     try{
//         const { name, moduleGrp, description } = req.body;
    
//         if(!name){
//             return res.status(500).send({ status : 0, message : "permission name is required" })
//         }
    
//         // ======== Check Exisiting Permission ==========
//         const existPermission = await permissionModel.findOne({ name })
//         if(name && existPermission ){
//             return res.status(400).send({ status : 0, message : "Permission already exist" })
//         }
    
//         if(!moduleGrp){
//             return res.status(500).send({ status : 0, message : "module is required" })
//         }
        
//         const createPermission = new permissionModel(req.body)
//         const permission =  await createPermission.save()
    
//         res.status(201).send({ status : 1, message : "permission Added!", data : permission})
//     } catch(err){
//         console.log(err);
//         return res.status(500).send({ status : 0, message : "Error While Add Permission" })
//     }
// }

// // ========== Read All Permission ========= 
// const readPermission = async (req, res) => {
//     try{
//         const permission = await permissionModel.find()
//         res.status(200).send({ status : 0, message : "Get Permission Successfully", data : permission })
//     } catch(err){
//         console.log(err);
//         return res.status(500).send({ status : 0, message : "Erro While Get Permission" })
//     }
// }

// // ======== Update Permission =========
// const updatePermission = async (req, res) => {
//     try{
//         const permissionId = req.params.id
//         const { name, moduleGrp, description } = req.body;

//         // check if permisson exist
//         const permission = await permissionModel.findById(permissionId)
//         if(!permission){
//             return res.status(404).send({ status : 0, message : "Permission not found" })
//         }

//         // Duplicate name check (only if name is changing)
//         if(name && name !== permission.name){
//             const existPermission = await permissionModel.findOne({ name })
//             if(existPermission){
//                 return res.status(400).send({ status : 0, message : "Permission already exist" })
//             }
//         }
        
//         const updateData = {
//             name : req.body.name || name,
//             moduleGrp : req.body.moduleGrp || moduleGrp,
//             description : req.body.description || description
//         }

//         const updatePermission = await permissionModel.findByIdAndUpdate(
//             permissionId,
//             updateData,
//             { new : true }
//         )
                
//         res.status(200).send({ status : 1, message : "update Permission Successfully", data : updatePermission })
//     } catch(err){
//         console.log(err);
//         return res.status(500).send({ status : 0, message : "Error while update Permission" })
//     }
// }

// const deletePermission = async(req, res) => {
//     try{
//         const permissionId = req.params.id;
//         const deletePermission = await taskModel.findByIdAndDelete(permissionId)

//         if(!deletePermission){
//             return res.status(404).send({
//                 status : 0,
//                 message : 'Permission not Found!'
//             })  
//         }

//         res.status(200).send({
//             status : 1,
//             message : "Delete Permission Successfully"
//         })
//     } catch(err){
//         console.log(err);
//         return res.status(500).send({ status : 0, message : "Error while delete Permission" })
//     }
// }

// module.exports = { createPermission, readPermission, updatePermission, deletePermission}