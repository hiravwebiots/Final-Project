const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
},{
    timestamps : true
})

const permissionModel = mongoose.model('permission', permissionSchema)
module.exports = permissionModel