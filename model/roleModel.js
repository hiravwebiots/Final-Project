const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true   // no duplicate role
    },

    description : {
        type  : String
    },

    isActive : {
        type : Boolean,
        default : true
    }
},
    {
        timestamps : true
    }
) 

const roleModel = mongoose.model('role', roleSchema)
module.exports = roleModel