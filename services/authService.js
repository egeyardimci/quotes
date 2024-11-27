const jwt = require("jsonwebtoken")
const process = require("process")

const authUser = (req,res,next) => {
    const token = req.body.token;
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

const authToken = (req,res,next) => {
    const authHeader = req.headers["cookie"];
    if (authHeader != null){
        let token = authHeader.split(" ")
        let formatToken = "";
        token.forEach(element => {
            if (element.search("token") != -1){
                formatToken = element.split("=")[1];
            }
        });

        if (formatToken != ""){
            jwt.verify(formatToken,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
                if (err){
                    console.log(err);
                    req.user = "";
                }
                else{
                req.user = user;
            }
            });
            next();
        }
        else{
            req.user = "";
            next();
        }
    }
    else{
        req.user = "";
        next();
    }
}

module.exports = {
    authUser,
    authToken
}