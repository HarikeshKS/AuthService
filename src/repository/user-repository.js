const { User } = require("../models/index");

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something is wrong in the repository layer");
            throw { error };
        }
    }
}

module.exports = UserRepository;
