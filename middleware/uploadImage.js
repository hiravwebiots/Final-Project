const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
})

const fileFilter = (req, file, cb) => {
    /**File : {
        fieldname: 'profileImage',
        originalname: 'Screenshot from 2026-01-30 16-17-58.png',
        encoding: '7bit',
        mimetype: 'image/png'
    } */

    // Set the File Extension 
    const allowTypes = ['image/jpg', 'image/jpeg']

    if(allowTypes.includes(file.mimetype) ){
        cb(null, true)
    }
    else{
        cb(new Error('only jpg, jpeg image need'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits : { fileSize : 5*1024*1024 } 
}).single('profileImage')


// custom middleware wrapper
const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {

        if(err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'){
                return res.status(400).send({ status : 0, message : "File Size is to large"})
            }

        if(err){
            console.log(err);
            return res.status(500).send({ status : 0, message : err.message })
        }
        next()
    })
}

module.exports = uploadImage