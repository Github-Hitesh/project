'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here

      User.belongsToMany(models.Course, {
        through: models.Enrollment,
        foreignKey: 'userId',
        otherKey: 'courseId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};