import db from '../config/database.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

class Transaction {
  static findAll(filters = {}) {
    let query = `
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.type) {
      query += ' AND t.type = ?';
      params.push(filters.type);
    }

    if (filters.category_id) {
      query += ' AND t.category_id = ?';
      params.push(filters.category_id);
    }

    if (filters.startDate) {
      query += ' AND t.date >= ?';
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ' AND t.date <= ?';
      params.push(filters.endDate);
    }

    query += ' ORDER BY t.date DESC, t.created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));

      if (filters.offset) {
        query += ' OFFSET ?';
        params.push(parseInt(filters.offset));
      }
    }

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static findById(id) {
    const stmt = db.prepare(`
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    `);
    const transaction = stmt.get(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }

  static create(data) {
    // Verify category exists
    const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(data.category_id);
    if (!category) {
      throw new ValidationError('Invalid category_id');
    }

    const stmt = db.prepare(`
      INSERT INTO transactions (type, amount, category_id, description, date)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.type,
      data.amount,
      data.category_id,
      data.description || null,
      data.date
    );

    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    // Verify transaction exists
    const existing = this.findById(id);

    // Verify category if being updated
    if (data.category_id) {
      const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(data.category_id);
      if (!category) {
        throw new ValidationError('Invalid category_id');
      }
    }

    const fields = [];
    const params = [];

    ['type', 'amount', 'category_id', 'description', 'date'].forEach(field => {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        params.push(data[field]);
      }
    });

    if (fields.length === 0) {
      return existing;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    const stmt = db.prepare(`
      UPDATE transactions SET ${fields.join(', ')} WHERE id = ?
    `);

    stmt.run(...params);
    return this.findById(id);
  }

  static deleteById(id) {
    const existing = this.findById(id);

    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      throw new NotFoundError('Transaction not found');
    }

    return true;
  }
}

export default Transaction;
