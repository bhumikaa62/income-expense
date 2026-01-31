'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Incomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',   // table name
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      source_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'IncomeCategories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },

      month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Incomes');
  }
};
