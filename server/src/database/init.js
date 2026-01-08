import { createTables } from './schema.js';
import { seedCategories, seedSampleData } from './seed.js';

console.log('🔧 Initializing database...\n');

try {
  // Create tables
  createTables();

  // Seed categories
  seedCategories();

  // Optionally seed sample data (comment out if not needed)
  seedSampleData();

  console.log('\n✨ Database initialization complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}
