const emailModel = require('../model/emailModel');

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

module.exports = createTemplate
