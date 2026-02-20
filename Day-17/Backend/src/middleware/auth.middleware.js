const jwt = require("jsonwebtoken");

async function identifyUser(req,res,next){

        const token = req.cookies.token;
    
        if(!token){
            return res.status(401).json({
                message:"Token not provided"
            })
        }
    
        let decoded = null;
    
        try{
            decoded =jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(err){
            res.status(409).json({
                message:"Invalid token, Unauthorised access "
            })
        }

        req.user = decoded;
        next();
}
module.exports = identifyUser;