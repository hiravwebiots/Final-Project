const permissionModel = require("../model/permissionModel");

const seedPermissions = async () => {
    try {
        const permissions = [
            { name: "create_user", module: "user" },
            { name: "update_user", module: "user" },
            { name: "delete_user", module: "user" },
            { name: "view_user", module: "user" },
            { name: "create_task", module: "task" },
            { name: "update_task", module: "task" },
            { name: "delete_task", module: "task" },
            { name: "view_task", module: "task" }
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

        console.log("Permission Seeding Completed");

    } catch (error) {
        console.log(error);
    }
};

module.exports = seedPermissions