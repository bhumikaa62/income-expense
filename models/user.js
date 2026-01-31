'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
 User.hasMany(models.Income, {
    foreignKey: 'user_id'
  });
   User.hasMany(models.Expense, {
    foreignKey: 'user_id'
  });
}
    
 
  }
   
  User.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};