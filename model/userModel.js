const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require : true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    phone: {
        type: String,
        required: true
    },

    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true
    },

    profileImage: {
        type: String,
    },

    avatarIcon: {
        type: String,
        default: null
    }
}, {
    timestamps: true   // automatically adds createdAt & updatedAt
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
