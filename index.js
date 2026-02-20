const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const connectDB = require("./config/db")
const taskRoutes = require("./routes/taskRoutes")
const loginRoutes = require("./routes/loginRoutes")
const userRoutes = require('./routes/userRoutes')
const userTaskAccessRoutes = require('./routes/userTaskAccessRoutes')
const emailTemplateRoutes = require('./routes/emailTemplateRoutes')
const rolePermissionRoutes = require('./routes/rolePermissionRoutes')
// const permissionRoutes = require("./routes/permissionRoutes")
const roleRoutes = require('./routes/roleRoutes')
const bodyParser = require('body-parser')
const app = express()
connectDB()

// add body parser for data in postman
app.use(bodyParser.json())
app.use('/upload', express.static('/uploads'))
app.use('/api/task', taskRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/user', userRoutes)
app.use('/api/task', userTaskAccessRoutes)
app.use('/api/template', emailTemplateRoutes)
// app.use('/api/permission', permissionRoutes)
app.use('/api/role', roleRoutes)
app.use('/api/rolepermission', rolePermissionRoutes)

app.listen(PORT, (err) => {
    console.log(`Server run on Port no. ${PORT}`);
})

