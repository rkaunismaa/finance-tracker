import db from '../config/database.js';
import { NotFoundError } from '../utils/errors.js';

class SavingsGoal {
  static findAll(filters = {}) {
    let query = 'SELECT * FROM savings_goals WHERE 1=1';
    const params = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM savings_goals WHERE id = ?');
    const goal = stmt.get(id);

    if (!goal) {
      throw new NotFoundError('Savings goal not found');
    }

    return goal;
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO savings_goals (name, target_amount, current_amount, deadline, color, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.name,
      data.target_amount,
      data.current_amount || 0,
      data.deadline || null,
      data.color || null,
      data.description || null,
      data.status || 'active'
    );

    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    // Verify goal exists
    const existing = this.findById(id);

    const fields = [];
    const params = [];

    // Auto-complete if current_amount >= target_amount
    if (data.current_amount !== undefined) {
      const targetAmount = data.target_amount !== undefined ? data.target_amount : existing.target_amount;
      if (data.current_amount >= targetAmount) {
        data.status = 'completed';
      }
    }

    ['name', 'target_amount', 'current_amount', 'deadline', 'color', 'description', 'status'].forEach(field => {
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
      UPDATE savings_goals SET ${fields.join(', ')} WHERE id = ?
    `);

    stmt.run(...params);
    return this.findById(id);
  }

  static deleteById(id) {
    const existing = this.findById(id);

    const stmt = db.prepare('DELETE FROM savings_goals WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      throw new NotFoundError('Savings goal not found');
    }

    return true;
  }
}

export default SavingsGoal;
