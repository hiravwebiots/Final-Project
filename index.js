const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const connectDB = require("./config/db")
const taskRoutes = require("./routes/taskRoutes")
const loginRoutes = require("./routes/loginRoutes")
const userRoutes = require('./routes/userRoutes')
const userViewRoutes = require('./routes/userViewRoutes')
const userTaskAccessRoutes = require('./routes/userTaskAccessRoutes')
const emailTemplateRoutes = require('./routes/emailTemplateRoutes')
const rolePermissionRoutes = require('./routes/rolePermissionRoutes')
// const permissionRoutes = require("./routes/permissionRoutes")
const roleRoutes = require('./routes/roleRoutes')
const bodyParser = require('body-parser')
const testRoutes = require('./routes/testRoutes')
const demoRoutes = require('./routes/demoRoutes')
const app = express()
connectDB()


// add body parser for data in postman
app.use(express.urlencoded({ extended : true }))
app.use(bodyParser.json())

app.use(express.static("public"))                   // Whithout public we can't access public folder

app.set('view engine', 'ejs')

app.use('/upload', express.static('/uploads'))

app.use('/api/task', taskRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/login', userViewRoutes)
app.use('/api/user', userRoutes)

app.use('/api/task', userTaskAccessRoutes)
app.use('/api/template', emailTemplateRoutes)
// app.use('/api/permission', permissionRoutes)
app.use('/api/role', roleRoutes)
app.use('/api/rolepermission', rolePermissionRoutes)
app.use('/', testRoutes)
app.use('/v1', demoRoutes)
        
app.listen(PORT, (err) => {
    console.log(`Server run on Port no. ${PORT}`);
})