const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    status : {
        type : String,
        enum : ['pending', 'in progress', 'success'],
        default : 'pending',
        required : true
    },
    assignDate : {
        type : Date,
        required : true
    },
    dueDate : {
        type : Date
        // required : true
    }
})  

const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel