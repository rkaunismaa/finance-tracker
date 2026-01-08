import db from '../config/database.js';

class Analytics {
  static getSummary(filters = {}) {
    let query = `
      SELECT
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
      FROM transactions
      WHERE 1=1
    `;
    const params = [];

    if (filters.startDate) {
      query += ' AND date >= ?';
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ' AND date <= ?';
      params.push(filters.endDate);
    }

    const stmt = db.prepare(query);
    const result = stmt.get(...params);

    // Handle NULL values when no transactions exist
    return {
      total_income: result.total_income || 0,
      total_expenses: result.total_expenses || 0,
      balance: result.balance || 0
    };
  }

  static getByCategory(filters = {}) {
    let query = `
      SELECT
        c.id,
        c.name,
        c.type,
        c.color,
        c.icon,
        COALESCE(SUM(t.amount), 0) as total,
        COUNT(t.id) as transaction_count
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id
    `;
    const params = [];
    const conditions = [];

    if (filters.startDate) {
      conditions.push('t.date >= ?');
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      conditions.push('t.date <= ?');
      params.push(filters.endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY c.id ORDER BY total DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static getTrends(filters = {}) {
    let query = `
      SELECT
        strftime('%Y-%m', date) as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as net
      FROM transactions
      WHERE 1=1
    `;
    const params = [];

    if (filters.startDate) {
      query += ' AND date >= ?';
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ' AND date <= ?';
      params.push(filters.endDate);
    }

    query += ' GROUP BY month ORDER BY month ASC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }
}

export default Analytics;
