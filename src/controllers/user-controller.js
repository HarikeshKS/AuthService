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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User is authenticated and token is valid",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to verify token",
            err: error,
        });
    }
};

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User is an admin",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to verify as admin",
            err: error,
        });
    }
};
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
};
