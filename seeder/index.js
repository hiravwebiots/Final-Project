require("dotenv").config();
const mongoose = require("mongoose");

const seedAdmin = require('./adminSeeder')
const seedPermissions = require('./permissionSeeder')



const runSeeder = async () => {
    try{
        
        await mongoose.connect(process.env.DB_URL)
        console.log("DB Connected for Seeder")
        
        await seedAdmin()
        console.log('Seed Admin');
        await seedPermissions()
        console.log('Work Seeder');

        console.log('All Seeding Complated');
        process.exit()

    } catch(err){   
        console.log(err);
        process.exit()
    }
}

runSeeder()