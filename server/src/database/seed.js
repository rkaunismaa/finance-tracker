import db from '../config/database.js';

export function seedCategories() {
  const categories = [
    // Expense categories
    { name: 'Housing', type: 'expense', color: '#f59e0b', icon: 'home' },
    { name: 'Transportation', type: 'expense', color: '#3b82f6', icon: 'car' },
    { name: 'Food & Dining', type: 'expense', color: '#10b981', icon: 'utensils' },
    { name: 'Utilities', type: 'expense', color: '#6366f1', icon: 'zap' },
    { name: 'Healthcare', type: 'expense', color: '#ec4899', icon: 'heart' },
    { name: 'Entertainment', type: 'expense', color: '#8b5cf6', icon: 'film' },
    { name: 'Shopping', type: 'expense', color: '#f43f5e', icon: 'shopping-bag' },
    { name: 'Travel', type: 'expense', color: '#06b6d4', icon: 'plane' },
    { name: 'Education', type: 'expense', color: '#14b8a6', icon: 'book' },
    { name: 'Other Expenses', type: 'expense', color: '#64748b', icon: 'more-horizontal' },

    // Income categories
    { name: 'Salary', type: 'income', color: '#10b981', icon: 'briefcase' },
    { name: 'Freelance', type: 'income', color: '#14b8a6', icon: 'code' },
    { name: 'Investments', type: 'income', color: '#06b6d4', icon: 'trending-up' },
    { name: 'Gifts', type: 'income', color: '#f59e0b', icon: 'gift' },
    { name: 'Other Income', type: 'income', color: '#64748b', icon: 'plus-circle' },
  ];

  const insertCategory = db.prepare(`
    INSERT OR IGNORE INTO categories (name, type, color, icon)
    VALUES (?, ?, ?, ?)
  `);

  const insertMany = db.transaction((categories) => {
    for (const category of categories) {
      insertCategory.run(category.name, category.type, category.color, category.icon);
    }
  });

  insertMany(categories);

  const count = db.prepare('SELECT COUNT(*) as count FROM categories').get();
  console.log(`✅ Seeded ${count.count} categories`);
}

export function seedSampleData() {
  // Optional: Add sample transactions for demo purposes
  const sampleTransactions = [
    {
      type: 'income',
      amount: 5000,
      category_id: 11, // Salary
      description: 'Monthly salary',
      date: new Date().toISOString().split('T')[0],
    },
    {
      type: 'expense',
      amount: 1200,
      category_id: 1, // Housing
      description: 'Rent payment',
      date: new Date().toISOString().split('T')[0],
    },
    {
      type: 'expense',
      amount: 85.50,
      category_id: 3, // Food & Dining
      description: 'Groceries',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    },
  ];

  const insertTransaction = db.prepare(`
    INSERT INTO transactions (type, amount, category_id, description, date)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((transactions) => {
    for (const txn of transactions) {
      insertTransaction.run(txn.type, txn.amount, txn.category_id, txn.description, txn.date);
    }
  });

  insertMany(sampleTransactions);

  console.log(`✅ Seeded ${sampleTransactions.length} sample transactions`);
}
