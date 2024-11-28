const jwt = require("jsonwebtoken")
const process = require("process")

const authUser = (req,res,next) => {
    const token = req.headers["authorization"];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err){
            res.status(401).send();
            return;
        }
        else{
            req.user = user;
            next();
        }
    });
}

module.exports = {
    authUser
}