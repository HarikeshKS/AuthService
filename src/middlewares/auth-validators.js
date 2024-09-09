const userValidators = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: "Email or password missing in the request",
        });
    }
    next();
};

const validateIsAdminRequest = async (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: "User ID doesn't exist or not given",
        });
    }
    next();
};

module.exports = {
    userValidators,
    validateIsAdminRequest,
};
