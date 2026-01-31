'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    
    static associate(models) {
      Expense.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
    Expense.belongsTo(models.ExpenseCategory, {
    foreignKey: 'category_id'
  });

    }
  }
  Expense.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    mode: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.INTEGER,
    expensedate: DataTypes.DATE,
    entrydate: DataTypes.DATE,
    bill: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};