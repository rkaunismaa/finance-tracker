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
}

export default Category;
