'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IncomeCategory extends Model {

    static associate(models) {
      // define association here
      IncomeCategory.hasMany(models.Income, {
    foreignKey: 'source_id'
  });
    }
  }
  IncomeCategory.init({
    income_source_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IncomeCategory',
  });
  return IncomeCategory;
};