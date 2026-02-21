const rolePermissionModel = require("../model/rolePermissionModel")

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try{
            const roleName = req.user.roleId.name   // roleName is stored in token
            console.log("roleName :", roleName)

            // ===== If Admin → Skip Permission Check =====
            if(roleName === "admin"){
                console.log("Admin login → Full access granted")
                return next()
            }
            
            // ========= Other Role Check for Access ========
            const roleId = req.user.roleId      // roleId is stored in token
            console.log('roleId : ', roleId);

            if(!roleId){
                return res.status(403).send({ status : 0, message : "roleId not found in token" })
            }

            // ===== Get all permissions of this role =====
            const rolePermissions = await rolePermissionModel.find({ RoleId : roleId }).populate("PermissionId")
            console.log('rolePermissions : ', rolePermissions);

            // ===== Extract permission names =====
            const permissions = rolePermissions.map(rp => rp.PermissionId.name)
            console.log('User Permissions :', permissions);
            
            console.log(permissions.includes(requiredPermission));

            // ==== Check Required Permission ====
            if(!permissions.includes(requiredPermission)){
                return res.status(403).send({ status : 0, message : "Access Denied!, Permission required" })
            }
            next()

        } catch(err){
            console.log(err);
            res.status(500).send({ status : 0, message : "error while checkPermission" })
        }
    }
}

module.exports = checkPermission