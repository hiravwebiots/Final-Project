const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    module : {
        type : String,
        required : true,           
    }
},{
    timestamps : true
})

const permissionModel = mongoose.model('permission', permissionSchema)
module.exports = permissionModel