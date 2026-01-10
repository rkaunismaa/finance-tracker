import db from '../config/database.js';
import { NotFoundError } from '../utils/errors.js';

class Category {
  static findAll(filters = {}) {
    let query = 'SELECT * FROM categories';
    const params = [];

    if (filters.type) {
      query += ' WHERE type = ?';
      params.push(filters.type);
    }

    query += ' ORDER BY name ASC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
    const category = stmt.get(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  static update(id, data) {
    // First check if category exists
    this.findById(id);

    const updates = [];
    const params = [];

    if (data.monthly_budget !== undefined) {
      updates.push('monthly_budget = ?');
      params.push(data.monthly_budget);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    params.push(id);
    const stmt = db.prepare(
      `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`
    );
    stmt.run(...params);

    return this.findById(id);
  }
}

export default Category;
