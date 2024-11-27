const User = require("../models/userModel")

const saveUser = async (user) => {
    try {
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getUser = async (username) =>{
    const user = await User.findOne({username: username});
    return user || null;
}

module.exports = {
    saveUser,
    getUser
}