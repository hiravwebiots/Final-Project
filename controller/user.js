const userModel = require('../model/userModel')
const roleModel = require('../model/roleModel')
const bcrypt = require('bcrypt')
const validationRole = require('../utils/utilityUserRole')

// ============= CREATE USER ============
const createUser = async (req, res) => {
    try{
        const { name, email, password, phone, roleId, profileImage,  avatarIcon} = req.body

        console.log("BODY:", req.body)
        console.log("FILE:", req.file)
        // ======== Required Filled Check ========== 
        if(!name){
            return res.status(400).send({ status : 0, message : "name is required" })
        }

        if(!email ){
            return res.status(400).send({ status : 0, message : "email is requies" })
        }

        if(!password){
            return res.status(400).send({ status : 0, message : "password is required" })
        }

        if(!phone){
            return res.status(400).send({ status : 0, message : "phone is required" })
        }

        // Profile Image
        if(!req.file){      
            return res.status(400).send({ status : 0, message : "profile Image required" })
        }

        // ========== EMAIL VALIDATION ==========
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
        if(!emailRegex.test(email)){                            // test is method of RegExpression for check string match or not
            return res.status(400).send({ status : 0, message : "Invalid email format" })
        }

        // ========== PHONE VALIDATION ==========
        const phoneRegex = /^[6-9]\d{9}$/ 
        if(!phoneRegex.test(phone)){      
            return res.status(400).send({ status : 0, message : "Invalid phone formate" })
        }

        // ========== ROLE VALIDATION ==========
        if(!roleId){
            return res.status(500).send({ status : 0, message : "please enter the role" })
        }

        const existRole = await roleModel.findById(roleId)
        if(!existRole){
            return res.status(404).send({ status : 0, message : "role not found" })
        }

        // if(role && !validationRole(role)){
        //     return res.status(400).send({ status : 0, message : "role must be 'admin' or 'employee'" })
        // }

        // ========== CHECK EMAIL UNIQUE ==========
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({ status : 0, message : "email already exist" })
        }

        // ========== HASH PASSWORD ==========
        const hashpassword = await bcrypt.hash(req.body.password, 11)
        // req.body.password = hashpassword
        
        const userData = {
            name,
            email,
            password : hashpassword,
            phone, 
            roleId,
            profileImage : req.file.filename
        }

        // ========== CREATE USER ==========
        const newUser = new userModel(userData)
        const savedUser = await newUser.save()

        res.status(201).send({ status : 1, message : "user add Successfully", data : savedUser})
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error while creating user", error : err })
    }
}

// ============= FETCH ALL USER ============
const getUsers = async (req, res) => {
    try{
        const user = await userModel.find().select('-password -otp -otpExpire')
        res.status(200).send({ status : 0, message : "user fetched Successfully", data : user})
    } catch (err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While fetching user", error : err })
    }
}

// ========== FETCH USER BY ID =============
const getUserById = async (req, res) => {
    try{
        const userId = req.params.id
        const user = await userModel.findById(userId).select('-password -otp -otpExpire')

        if(!user){
            res.status(500).send({ status : 0, message : "user not found" })
        }
        res.status(200).send({ status : 0, message : "user fetched Successfully", data : user})
    } catch (err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While fetching user", error : err })
    }
} 

// ============= UPDATE USER ============
const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const { name, email, password, phone, roleId, profileImage,  avatarIcon} = req.body

        // ======== Check user Exists ========== 
        const user = await userModel.findById(userId)
        if(!user){
            res.status(500).send({ status : 0, message : "user not found"})
        }

        // ======== Email Validation ========== 
        if(email){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // Test is method of Reg. Expression for check string match or not
            if(!emailRegex.test(email)){
                return res.status(400).send({ status : 0, message : "Invalid email format" })
            }    
        }
        
        // ========== CHECK EMAIL UNIQUE ==========
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({ status : 0, message : "email already exist" })
        }

        // ======== Phone Validation ========== 
        if(phone){
            const phoneRegex = /^[6-9]\d{9}$/ 
            if(!phoneRegex.test(phone)){
                return res.status(400).send({ status : 0, message : "Invalid phone formate" })
            }   
        }
        
        // ========== ROLE VALIDATION ==========
        if(!roleId){
            return res.status(500).send({ status : 0, message : "please enter the role" })
        }

        const existRole = await roleModel.findById(roleId)
        if(!existRole){
            return res.status(404).send({ status : 0, message : "role not found" })
        }

        // if(role && !['admin', 'employee'].includes(role)){
        //     return res.status(400).send({ status : 0, message : "role must be 'admin' or 'employee' " })
        // }

        // ======= Update Object =========        
        const updateData = {
            name : req.body.name || user.name,
            email : req.body.email || user.email, 
            phone : req.body.phone || user.phone,
            roleId : req.body.roleId || user.roleId,
            profileImage : req.file.path || user.profileImage || null,
            avatarIcon : req.file.path || user.avatarIcon || null
        }

        // ======== Password Update ==========
        if(password){
            const hashpassword = await bcrypt.hash(req.body.password, 11)
            updateData.password = hashpassword
        }

        // ======== profile Image update =====
        if(req.file){
            if(user.profileImage && fs.existsSync(user.profileImage)){
                fs.unlinkSync(user.profileImage)
            }
            updateData.profileImage = req.file.path

            if(user.avatarIcon && fs.existSync(user.profileImage)){
                fs.unlinkSync(user.avatarIcon)
            }
            updateData.avatarIcon = req.file.path
        }

        // ========== update user ==========
        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new : true}
        ).select('-password ')

        if(!updateUser){
            return res.send(404).send({ status : 0, message : "user not found" })
        }
        res.status(200).send({ status : 1, message : "update User Successfully", data : updateUser })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While updating user", error : err })
    }
}

// =========== Delete User ===========
const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await userModel.findByIdAndDelete(userId)
        
        if(!user){
            return res.status(404).send({ status : 0, message : "user not found" })
        }

        if(user.profileImage && fs.existsSync(user.profileImage)){
            fs.unlinkSync(user.profileImage)
        }

        if(user.avatarIcon && fs.existSync(user.avatarIcon)){
            fs.unlinkSync(user.avatarIcon)
        }
        
        res.status(200).send({ status : 1, message : "user deleted Successfully" })
    } catch(err){
        console.log(err);
        res.status(500).send({ status : 0, message : "Error While delete user", error : err })
    }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser }