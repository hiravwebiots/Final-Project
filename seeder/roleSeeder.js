const roleModel = require('../model/roleModel')

const seedRole = async () => {
    try{
        const role = {
            name : 'admin'
        };

        const exists = await roleModel.findOne({ name : role.name })

        if(!exists){
            await roleModel.create(role)
        } else {
            console.log(`Already ${role.name} role exist`);
        }

    } catch(err){
        console.log(err);
    }
}

module.exports = seedRole