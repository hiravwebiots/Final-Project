require("dotenv").config();
const mongoose = require("mongoose");

const seedRole = require('./roleSeeder')
const seedAdmin = require('./adminSeeder')
const seedPermissions = require('./permissionSeeder')


const runSeeder = async () => {
    try{
        
        await mongoose.connect(process.env.DB_URL)
        console.log("DB Connected for Seeder")
        
        await seedRole()
        console.log('seed Role');
        await seedAdmin()
        console.log('Seed Admin');
        await seedPermissions()
        console.log('Seed Permission');

        console.log('All Seeding Complated');
        process.exit()

    } catch(err){   
        console.log(err);
        process.exit()
    }
}

runSeeder()