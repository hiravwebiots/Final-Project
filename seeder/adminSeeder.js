const bcrypt = require("bcrypt");
const userModel = require('../model/userModel');
const roleModel = require('../model/roleModel')

const seedAdmin = async () => {
    try {

        // ===== Find Admin Role =======
        const adminRole = await roleModel.findOne({ name : 'admin' })
        if(!adminRole){
            console.log('Admin role not found, Please run role seeder first');
            return;
        }
        
        // ====== Check Existing Admin ======== 
        let admin = await userModel.findOne({ email: process.env.ADMIN_EMAIL });
        if (!admin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 11);
            
            admin = await userModel.create({
                name: "Admin 1",
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                phone: 9874563251,
                roleId: adminRole.id
            });
            
            // console.log('Working Here admin create seeder');
            console.log("Default Admin Created");
        } else {
            console.log("Admin Already Exists");
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = seedAdmin
