const userService = require("../services/userService")

const registerUser = async (req,res) => {
    const result = await userService.registerUser(req.body.username,req.body.password);
    result != false ? res.status(200).send() : res.status(400).send();
};

const loginUser = async (req,res) => {
    const result = await userService.loginUser(req.body.username,req.body.password);
    result != null ? res.json(result) : res.status(403).send();
};

 const authUser = (req,res) => {
    const result = userService.authUser(req.body.token);
    result != undefined ? res.json(result) : res.json("NOUSER");
};

module.exports = {
    registerUser,
    authUser,
    loginUser
}