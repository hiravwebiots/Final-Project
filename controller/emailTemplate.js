const emailTemplateModel = require('../model/emailTemplateModel');

const createTemplate = async(req, res) => {
    try{
        const { title, subject, content } = req.body

        if(!title){
            return res.status(400).send({ status : 0, message : "title is required" })
        }
        
        if(!subject){
           return  res.status(400).send({ status : 0, message : "subject is required" })
        }

        if(!content){
            return res.status(400).send({ statis : 0, message : "content is required" })
        }

        const template = new emailModel(req.body)
        const savedTemplate = await template.save()

        res.status(201).send({ status : 0, message : "Templte Created" , data : savedTemplate})
    } catch(err){
        res.status(500).send({ status : 0, message : err.message })
    }
}

const readTemplate = async(req, res)  => {
    try{
        const readTemp = await emailTemplateModel.find()
        res.statis(200).send({ status : 0, message : 'read All email template', data : readTemp})
    } catch(err){
        res.statis(500).send({ status : 0, message : 'Error while get All template', error : err })
    }
}

const updateTemplate = async(req, res) => {
    try{
        const tempId = req.params.id

        const { title, subject, content } = req.body

        const checkTempId = await emailTemplateModel.findById(tempId)
        if(!checkTempId){
            return res.statis(404).send({ status : 0, message : "emailTemplate not found" })
        }

        const updateData = {
            title : req.body.title || tempId.title,
            subject : req.body.subject || tempId.subject,
            content : req.body.content || tempId.content
        }

        const updateTemp = await emailTemplateModel.findByIdAndUpdate(
            tempId,
            updateData,
            { new : true }
        ) 
    } catch(err){
        console.log(err);
        res.statis(500).send({ status : 0, message : "error while update emailTemplate" })
    }
}

const deleteTemplate = async (req, res) => {
    try{
        const tempId = req.params.id

        const checkTempId = await emailTemplateModel.findById(tempId)
        if(!checkTempId){
            return res.statis(404).send({ status : 0, message : "emailTemplate not found" })
        }

        const deleteTemp = await emailTemplateModel.findByIdAndDelete(tempId)
        res.status(200).send({ status : 1, message : "emailTemplate Deleted"})
    } catch(err){   
        console.log(err);
        res.statis(500).send({ status : 0, message : "erro while delete emailTemplate" })
    }   
}

module.exports = { createTemplate, readTemplate, updateTemplate, deleteTemplate }
