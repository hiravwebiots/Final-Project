const jwt = require('jsonwebtoken')

const checkAuthentication = (req, res, next) => {
    try{
        const token = req.headers['authorization']

        if(!token){
            return res.status(401).send({ status : 0, message : "No token Provided, Enter the Token!" })
        }
        
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verify
        console.log("req.user : ", req.user);
        
        next()

    } catch(err){
        res.status(400).send({ status : 0, message : "Invalid Token or Token Expired!" })
    }
}

const checkRoleAuthorization = (allowRole) => {
    return (req, res, next) => {
        try{
                
            if(allowRole.includes(req.user.roleId.name)){
                next()
            } else{
                return res.status(500).send({status : 0, message : 'you are not Admin, unauthorize for this operation!'})
            }
        } catch(err){
            console.log(err);
            return res.status(500).send({ status: 0, message: "Internal server error" });
        }
    }   
}

module.exports = { checkAuthentication, checkRoleAuthorization }
