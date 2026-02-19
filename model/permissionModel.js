const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    module : {
        type : String,
        required : true,            // Depends : 'create_user, update_user', 'task_create, task_update' 'project' etc...    
        trim : true
    }
},{
    timestamps : true
})

const permissionModel = mongoose.model('permission', permissionSchema)
module.exports = permissionModel