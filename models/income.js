'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
   
    static associate(models) {
    Income.belongsTo(models.User, {
    foreignKey: 'user_id'
  });


    Income.belongsTo(models.IncomeCategory, {
    foreignKey: 'source_id'
  });

    }
   
  }

   
  Income.init({
    user_id: DataTypes.INTEGER,
    source_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    month: DataTypes.STRING,
    year: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};