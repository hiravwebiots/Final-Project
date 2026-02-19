const userModel = require('../model/userModel')
const taskModel = require('../model/taskModel')
const { validateStatus } = require('../utils/utilityTask')

const getTaskbyUser = async (req, res) => {
    try{

        const taskList = await taskModel.find({ assignedTo : req.user._id })
        
        res.status(200).send({ status : 1, message : "Get Task List Successfully", data : taskList })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While get user assigned task list" })
    }
}   


// Pending 
const updateTaskbyUser = async (req, res) => {
    try{    
        let taskId = req.params.id
        console.log(`taskId ${taskId}`);
        
        let userId = req.user._id
        console.log(`userID ${userId}`);

        const { title, status } = req.body    

        
        if(status && !validateStatus(status)){
            return res.status(400).send({ status : 0, message : "status must be 'pending' or 'success'"})
        }

        let updateObj = {
            status
        }

        const updateTask = await taskModel.findByIdAndUpdate(
            { _id : taskId, assignedTo : userId},
            updateObj,
            { new : true }
        )
        console.log(updateTask);
          
        if(!updateTask){
            res.status(500).send({ status : 0, message : "Task not found or not assigned to this user"})
        }

        res.status(200).send({ status : 1, message : "update Status successfully", data : updateTask})
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Erro while update assigned TASK STATUS" })
    }
}

module.exports = { getTaskbyUser, updateTaskbyUser }