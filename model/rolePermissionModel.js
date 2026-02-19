const mongoose = require('mongoose')

const rolePermissionSchema = mongoose.Schema({
    RoleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'role',
        required : true
    },
    PermissionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'permission',
        required : true
    }
})
    
const rolePermissionModel = mongoose.model('rolePermission', rolePermissionSchema)
module.exports = rolePermissionModel