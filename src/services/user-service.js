const { JWT_KEY } = require("../config/server-config");
const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw { error };
        }
    }

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            console.log(user);

            const passwordsMatch = this.checkPassword(
                plainPassword,
                user.password
            );

            if (!passwordsMatch) {
                console.log("Password doesn't match", error);
                throw { error: "Incorrect Password" };
            }

            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log(
                "Something went wrong in the Sign In (service layer)",
                error
            );
            throw { error };
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
            return result;
        } catch (error) {}
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(
                userInputPlainPassword,
                encryptedPassword
            );
        } catch (error) {
            console.log("Something went wrong in password check", error);
            throw { error };
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw { error };
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token); // this will return => {email : <>, id: , iat: <>, expiresIn: <>}
            console.log(response);
            
            if (!response) {
                throw { error: "Invalid token" };
            }

            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: "No user with the corresponding token exists" };
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth (service layer)", error);
            throw { error };
        }
    }
    
    async isAdmin(userId){
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong in auth (service layer)", error);
            throw { error };
        }
    }
}

module.exports = UserService;
