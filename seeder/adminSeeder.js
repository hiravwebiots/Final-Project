const bcrypt = require("bcrypt");
const userModel = require('../model/userModel');

const seedAdmin = async () => {
    try {

        let admin = await userModel.findOne({ email: process.env.ADMIN_EMAIL });

        if (!admin) {

            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 11);

            admin = await userModel.create({
                name: "Admin 1",
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                phone: 9874563251,
                role: "admin"
            });

            console.log("Default Admin Created");
        } else {
            console.log("Admin Already Exists");
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = seedAdmin
