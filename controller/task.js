const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')
const { validateStatus, validateDate } = require('../utils/utilityTask')
const emailTemplateModel = require('../model/emailTemplateModel')
const sendEmail = require('../utils/sendEmail')

const createTask = async (req, res) => {
    try{

        const { assignedTo, title, description, status, assignDate, dueDate } = req.body;

        if(!assignedTo){
            return res.status(400).send({ status : 0, message : "assigned the task" })
        }

        const user = await userModel.findById(assignedTo)
        if(!user){
            return res.status(404).send({ status : 0, message : "user not found" })
        }

        // Title & Description required
        if(!title){
            return res.status(400).send({ status : 0, message : "title is required!" })
        }

        // if status not entered then it's by default pending       
        // status --> pending or success
        if(status && !validateStatus(status)){
            return res.status(400).send({ status : 0, message : "status must be 'pending' or 'success' " })
        }

        // assign Date --> must be Date Formate
        if(!assignDate){
            return res.status(400).send({ status : 0, message : "Assign Date is Required" })
        }

        if(!validateDate(assignDate)){
            return res.status(400).send({ status : 0, message : "Invalid Assign Date Format" })
        }
        let assign = new Date(assignDate)

        // Due Date not enter then error
        if(!dueDate){
            return res.status(400).send({ status : 0, message : "Due Date is Required" })
        }

        // Due date enter then Validation
        if(!validateDate(dueDate)){
            return res.status(400) .send({ status : 0, message : "Invalid Due Date Format" })
        }
        let due = new Date(dueDate)

        // check assign less than due ot not
        if(assign && due && assign > due){
            return res.status(400).send({ status : 0, message : "assigdate must be less than dueDate" })
        }

        // ====== Saved Task ==========
        const newTask = new taskModel(req.body)
        const savedTask = await newTask.save()

        // ====== Find Email Template ==========
        const template = await emailTemplateModel.findOne({ title : "Task Assigned" })
        
        if(!template){
            return res.status(500).send({ status : 0, message : "Template not found" })
        }

        if(template){
            await sendEmail(
                user.email,              // to    
                template.subject,       // subject
                template.content,       // html 
                {                       // data
                    title : newTask.title,
                    dueDate : newTask.dueDate
                }
            )
        }
        res.status(201).send({ status : 1, message : "Add Task Successfully", data : savedTask })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While Add Task", error : err })
    }
}

const getTask = async (req, res) => {
    try{
        const tasks = await taskModel.find()
        res.status(200).send({ status : 1, message : "Get Task Successfully", data : tasks })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Erro While Get Task", error : err })
    }
}

const updateTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const { assignedTo, title, description, status, assignDate, dueDate } = req.body
        
        if(!assignedTo){
            return res.status(400).send({ status : 0, message : "assigned the task" })
        }

        const user = await userModel.findById(assignedTo)
        if(!user){
            return res.status(500).send({ status : 0, message : "user not found" })
        }
        
        if(!title){
            return res.status(400).send({ status : 0, message : "title is required!" })
        }

        // status --> Pending or Success
        if(status && !validateStatus(status)){
            return res.status(400).send({ status : 0, message : "status must be 'pending' or 'success' " })
        }

        // assign Date not enter
        if(!assignDate){
            return res.status(400).send({ status : 0, message : "Assign Date is Required" })
        }

        // Assign date enter then Validation
        if(!validateDate(assignDate)){
            return res.status(400).send({ status : 0, message : "Invalid Date Format" })
        }
        let assign = new Date(assignDate)

        // Due Date not enter then error
        if(!dueDate){
            return res.status(400).send({ status : 0, message : "Due Date is Required" })
        }

        // Due date enter then Validation
        if(!validateDate(dueDate)){
            return res.status(400) .send({ status : 0, message : "Invalid Date Format" })
        }
        let due = new Date(dueDate)

        // check assign less than due ot not
        if(assign && due && assign > due){
            return res.status(400).send({ status : 0, message : "assigdate must be less than dueDate" })
        }

        const updateData = { 
            assignedTo,
            title, 
            description, 
            status, 
            assignDate,
            dueDate 
        }

        const updateTask = await taskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new : true }
        )

        if(!updateTask){
            return res.status(404).send({ status : 0, message : 'Task not Found!' })
        }

        res.status(200).send({ status : 1, message : "update Task Successfully", data : updateTask })

    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While Update Task", error : err})
    }
}

const deleteTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const deleteTask = await taskModel.findByIdAndDelete(taskId)

        if(!deleteTask){
            return res.status(404).send({ status : 0, message : 'Task not Found!' })
        }

        res.status(200).send({ status : 1, message : "Delete Task Successfully" })
    }
    catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While Delete Task" })
    }
}
 
module.exports = { createTask, getTask, updateTask, deleteTask}
