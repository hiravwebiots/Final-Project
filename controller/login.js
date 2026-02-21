const userModel = require('../model/userModel')
const otpModel = require('../model/otpModel')   
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailTemplateModel = require('../model/emailTemplateModel')
const sendEmail = require("../utils/sendEmail")

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).populate("roleId")
        // const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({ status : 0, message : "user not found, enter registerd email addresss" })
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(404).send({ status : 0, message : "Invalid password" })
        }

        // Password not show in during login
        user.password = undefined

        const tokenObj = {
            _id : user._id,
            email : user.email,
            roleId : user.roleId,
            name : user.roleId.name
        }

        const token = jwt.sign(tokenObj, process.env.SECRET_KEY, {expiresIn : '1h'})

        res.status(200).send({ status : 1, message : "login Successfully", token : token, data : user })

    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While Login User", error : err })
    }
}

const sendOtp = async (req, res) => {
    try{
        const { email } = req.body;
        
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).send({ status : 0, message : "user not found while send otp" })
        }

        // ========= Generate 6 Digit OTP ========
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ========= Delete old OTP if exists =========
        await otpModel.deleteMany({ userId : user._id })

        // ======== Save OTP in otp collection =========
        const otpData = new otpModel({
            userId : user._id,
            email : user.email,
            otp : otp,
            isOtpVerified : false
        })
        await otpData.save()
        console.log("otpData : ", otpData);
        
        otpData.otpExpire = Date.now() + 5 * 60 * 1000;

        // ===== Find Email Template ======
        const template = await emailTemplateModel.findOne({ title : "Send OTP for Forgot Password" })
        console.log("template : ", template);
        
        if(!template){
            return res.status(500).send({ status : 0, message : "Template not found" })
        }

        if(template){
            await sendEmail(
                user.email,
                template.subject,       
                template.content,
                {
                    otp : otpData.otp
                }
            )
        }
        // await sendEmail(
        //     email,
        //     "passwoed Forgot OTP",
        //     `<h3>Your otp is ${otp}</h3>
        //     <p> valid for 5 minutes </p>`
        // )

        res.status(200).send({ status : 1, message : "otp sent to email" })
    } catch(err){
        console.log(err);
        res.status(500).send({ status: 0, message: "Error while sending OTP", err });
    }   
}

const verifyOtp = async (req, res) => {
    try{
        const { email, otp } = req.body

        // ======= Find OTP Record =============
        const otpData = await otpModel.findOne({ 
            email : email,
            otp : otp
         })

         if(!otpData){
            return res.status(400).send({ status : 0, message : "Invalid OTP"})
         }

        // ===== Check expiry ======
        if (otpData.expireAt && otpData.expireAt < Date.now()) {
            return res.status(400).send({ status: 0, message: "OTP expired" })
        }

        // otp remove or null when use otp = null
        // user.otp = null
        // user.otpExpire = null;
 
        otpData.isOtpVerified = true;

        await otpData.save();
        res.send({ status: 1, message: "OTP verified successfully" })

    } catch(err){
        console.log(err);
        res.status(500).send({ status: 0, message: "Error verifying OTP" });
    }
}

const forgotPassword = async (req, res) => {
    try{
        const { email, newPassword } = req.body

        // ======= Find User Record ===========
        const user = await userModel.findOne({ email })

        // ======= Find OTP Record =============
        const otp = await otpModel.findOne({ email : email })

        if(otp.isOtpVerified === true){
            return res.status(400).send({ status : 0, message : "Please first Verified the OTP"})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword
        otp.isOtpVerified = false;
        await user.save()
        await otp.save()

        res.status(200).send({ status : 1, message : "Password forgot successfully" })

    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "error forgot Password", error : err})
    }
}

module.exports = { loginUser, sendOtp, verifyOtp, forgotPassword};