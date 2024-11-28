const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const userRepository = require("../repository/userRepository")
const jwt = require("jsonwebtoken")

const registerUser = async (username,password) => {
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            username: username,
            password: hashedPassword
        });
        userRepository.saveUser(user);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const loginUser = async (username,password) => {
    const user = await userRepository.getUser(username);
    if(user != null){
        try{
            if(await bcrypt.compare(password,user.password)){
                const accessToken = jwt.sign({username: user.username, id: user._id}, process.env.ACCESS_TOKEN_SECRET);
                return accessToken
            }
            else{
                return null;
            }
        }
        catch (error) {
            console.log(error)
            return null;
        }
    }
    else{
        console.log("User not found!");
        return null;
    }
}

//Returns user details to the client
const authUser = (token) => {
    if(token != null){
        return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }
}

module.exports = {
    registerUser,
    loginUser,
    authUser
}