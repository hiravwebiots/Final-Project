const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true   // no duplicate role
    },

    permissions : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'permission'
    }
},
    {
        timestamps : true
    }
) 

const roleModel = mongoose.model('role', roleSchema)
module.exports = roleModel