'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt");
const { SALT } = require('../config/server-config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'User_Roles'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 300]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  // ! the below methods are call HOOKS, that sequelize provide
  User.beforeCreate((user) => {
    const encryptedPass = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPass;
  });
  return User;
};