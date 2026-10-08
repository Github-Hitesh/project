'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {

      Course.belongsToMany(models.User, {
        through: models.Enrollment,
        foreignKey: 'courseId',
        otherKey: 'userId'
      })
    }
  }
  Course.init({
    courseName: DataTypes.STRING,
    description: DataTypes.STRING,
    credits: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};