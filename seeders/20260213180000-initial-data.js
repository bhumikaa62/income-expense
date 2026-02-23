'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // 1️⃣ Insert User
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Bhumika',
      mobile: '8888888888',
      email: 'bhumika@test.com',
      password: '123456',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // 2️⃣ Insert Income Category
    await queryInterface.bulkInsert('IncomeCategories', [{
      id: 1,
      income_source_name: 'Salary',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // 3️⃣ Insert Expense Category
    await queryInterface.bulkInsert('ExpenseCategories', [{
      id: 1,
      expense_category_name: 'Food',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // 4️⃣ Insert Multiple Incomes
    await queryInterface.bulkInsert('Incomes', [
      {
        user_id: 1,
        source_id: 1,
        amount: 50000,
        month: '01',
        year: 2026,
        date: new Date('2026-01-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        source_id: 1,
        amount: 52000,
        month: '02',
        year: 2026,
        date: new Date('2026-02-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        source_id: 1,
        amount: 51000,
        month: '03',
        year: 2026,
        date: new Date('2026-03-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

       await queryInterface.bulkInsert('IncomeCategories', [
      { income_source_name: 'Salary', createdAt: now, updatedAt: now },
      { income_source_name: 'Freelancing', createdAt: now, updatedAt: now },
      { income_source_name: 'Business', createdAt: now, updatedAt: now },
      { income_source_name: 'Interest Income', createdAt: now, updatedAt: now },
      { income_source_name: 'Rental Income', createdAt: now, updatedAt: now },
      { income_source_name: 'Bonus', createdAt: now, updatedAt: now }
    ], {});


     

    // 5️⃣ Insert Multiple Expenses
   await queryInterface.bulkInsert('Expenses', [
  {
    user_id: 1,
    category_id: 1,
    amount: 5000,
    mode: 'Cash',
    month: 1,
    year: 2026,
    expensedate: new Date('2026-01-10'),
    entrydate: '2026-01-10',
    bill: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    user_id: 1,
    category_id: 1,
    amount: 4500,
    mode: 'UPI',
    month: 2,
    year: 2026,
    expensedate: new Date('2026-02-12'),
    entrydate: '2026-02-12',
    bill: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    user_id: 1,
    category_id: 1,
    amount: 6000,
    mode: 'NEFT',   // 🔥 FIXED HERE
    month: 3,
    year: 2026,
    expensedate: new Date('2026-03-15'),
    entrydate: '2026-03-15',
    bill: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
], {});

   await queryInterface.bulkInsert('ExpenseCategories', [
      { expense_category_name: 'Food', createdAt: now, updatedAt: now },
      { expense_category_name: 'Rent', createdAt: now, updatedAt: now },
      { expense_category_name: 'Travel', createdAt: now, updatedAt: now },
      { expense_category_name: 'Shopping', createdAt: now, updatedAt: now },
      { expense_category_name: 'Electricity Bill', createdAt: now, updatedAt: now },
      { expense_category_name: 'Internet Bill', createdAt: now, updatedAt: now },
      { expense_category_name: 'Medical', createdAt: now, updatedAt: now },
      { expense_category_name: 'Entertainment', createdAt: now, updatedAt: now }
    ], {});
  

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {});
    await queryInterface.bulkDelete('Incomes', null, {});
    await queryInterface.bulkDelete('ExpenseCategories', null, {});
    await queryInterface.bulkDelete('IncomeCategories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
