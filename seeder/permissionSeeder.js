const permissionModel = require("../model/permissionModel");

const seedPermissions = async () => {
    try {
        const permissions = [
            { name: "create_user"},
            { name: "view_user"},
            { name: "update_user"},
            { name: "delete_user"},
            { name: "create_task"},
            { name: "view_task"},
            { name: "update_task"},
            { name: "delete_task"}
        ];

        for (let perm of permissions) {

            const exists = await permissionModel.findOne({ name: perm.name });

            if (!exists) {
                await permissionModel.create(perm); 
                console.log(`Created: ${perm.name}`);
            } else {
                console.log(`Already Exists: ${perm.name}`);
            }
        }

        // console.log("Permission Seeding Completed");

    } catch (error) {
        console.log(error);
    }
};

module.exports = seedPermissions