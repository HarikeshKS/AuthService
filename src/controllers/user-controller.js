const UserService = require("../services/user-service");

const userService = new UserService();
const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(201).json({
            data: response.email,
            success: true,
            message: "Successfully created a user",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to create a user",
            err: error,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(
            req.body.email,
            req.body.password
        );
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully Signed in the user",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to Sign in",
            err: error,
        });
    }
};
module.exports = {
    create,
    signIn,
};
