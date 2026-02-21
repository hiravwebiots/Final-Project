const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, 
    secure : false, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((err, success) => {
    if(err){
        console.log('SMTP Error :', err);
    } else{
        console.log('SMTP Server is ready');
    }
})

/** Send Email Function */
const sendEmail = async (to, subject, templateContent, data) => {
    try{
        console.log('working');
        
        // Compile template (Handlebars)  --> for dynamic Template for email
        const compiledTemplate = handlebars.compile(templateContent);
        console.log("templateContent : ", templateContent);
        
        const html = compiledTemplate(data);

        console.log("subject  : ", subject);
    
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html
        })

    } catch(err){
        console.log('Send Email Error', err);
    }
}
module.exports = sendEmail;
