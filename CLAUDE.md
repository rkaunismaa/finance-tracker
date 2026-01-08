# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal finance tracker web application with income/expense tracking, savings goals, and data visualizations. Single-user application with a Notion-meets-Mint aesthetic.

**Tech Stack:**
- Frontend: React 18 + Vite, Tailwind CSS, React Query, Zustand, Recharts
- Backend: Node.js + Express (ES modules)
- Database: SQLite with better-sqlite3 (synchronous API)

## Development Commands

### Initial Setup
```bash
# Install all dependencies (root, client, server)
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Initialize database (creates tables and seeds categories)
npm run init-db
```

### Running the Application
```bash
# Run both client and server concurrently
npm run dev

# Run client only (Vite dev server on port 3000)
npm run dev:client

# Run server only (Express API on port 5000)
npm run dev:server

# Production build
npm run build  # Builds client
npm start      # Starts production server
```

### Database Management
```bash
# Reinitialize database (from root)
npm run init-db

# Direct database script (from server directory)
cd server && node src/database/init.js
```

### Linting
```bash
# Lint frontend code
cd client && npm run lint
```

## Architecture Overview

### Monorepo Structure
```
/client          # Vite React frontend
/server          # Express backend
/package.json    # Root scripts using concurrently
```

### Backend Architecture

**Database Layer:**
- `server/src/config/database.js` - Single SQLite connection exported as default
- `server/src/database/schema.js` - Table creation with indexes
- `server/src/database/seed.js` - Category seeding (15 default categories)
- Uses better-sqlite3's **synchronous** API (not async)

**Database Schema:**
- `categories` - Income/expense categories with color/icon
- `transactions` - Financial transactions linked to categories
- `savings_goals` - Savings targets with progress tracking
- Foreign keys are enabled via pragma

**API Pattern (when implemented):**
- Models handle all database operations (repository pattern)
- Controllers are thin, handling request/response
- Routes define endpoints and use express-validator middleware
- All API endpoints are prefixed with `/api`

**Server Configuration:**
- ES modules (`"type": "module"` in package.json)
- Uses `fileURLToPath` and `path` for `__dirname` in ES modules
- Environment variables loaded via dotenv from `server/.env`
- CORS enabled for frontend communication
- Morgan logging in dev mode

### Frontend Architecture

**State Management Strategy:**
- **React Query** - Server state (transactions, categories, goals, analytics)
  - Configured with 5-minute stale time
  - Retry: 1, refetchOnWindowFocus: false
- **Zustand** - Client state (UI state, preferences) - to be implemented

**API Communication:**
- Vite proxy forwards `/api/*` to `http://localhost:5000`
- API client will use axios (service layer pattern)

**Component Organization (planned):**
```
src/components/
  common/          # Reusable UI (Button, Card, Modal, Input, etc.)
  layout/          # Header, Sidebar, Layout wrapper
  dashboard/       # Dashboard-specific widgets
  transactions/    # Transaction management components
  goals/           # Savings goals components
  charts/          # Recharts visualization components
```

**Styling:**
- Tailwind CSS with custom color palette
- Custom colors: `primary`, `income` (green), `expense` (red)
- Notion-inspired design system

**React Query Hooks Pattern (to be implemented):**
```javascript
// Custom hooks wrap React Query
useTransactions(filters)    // Query
useCreateTransaction()      // Mutation with cache invalidation
useUpdateTransaction()      // Mutation
useDeleteTransaction()      // Mutation
```

### Key Architectural Decisions

1. **Synchronous Database API:** better-sqlite3 is synchronous, not async. No `await` needed for database calls.

2. **ES Modules Everywhere:** Both client and server use ES modules. Import statements require `.js` extensions for local modules.

3. **Single Database Connection:** `server/src/config/database.js` exports a singleton database instance used across all models.

4. **API Route Structure:** Routes mount at `/api/<resource>` (e.g., `/api/transactions`, `/api/goals`)

5. **Indexes for Performance:** Database has indexes on `transactions.date`, `transactions.category_id`, and composite `(type, date)`

6. **Transaction Pattern:** Database seed uses `db.transaction()` for atomic multi-row inserts

## Data Model Notes

**Categories:**
- Pre-seeded with 10 expense and 5 income categories
- Each has name, type, color (hex), and icon (identifier for lucide-react)
- Cannot be deleted if transactions reference them (foreign key constraint)

**Transactions:**
- Type constrained to 'income' or 'expense'
- Amount must be positive (validation at DB level)
- Linked to category via foreign key
- Has created_at and updated_at timestamps

**Savings Goals:**
- Tracks target_amount and current_amount
- Status: 'active', 'completed', or 'archived'
- Optional deadline date

## Development Notes

### Adding New API Endpoints

1. Create model in `server/src/models/<Resource>.js` with static methods
2. Create controller in `server/src/controllers/<resource>Controller.js`
3. Create routes in `server/src/routes/<resources>.js` with validation
4. Import and mount routes in `server/src/server.js`

### Adding New React Components

1. Create component in appropriate `client/src/components/<category>/` folder
2. For data fetching, create custom hook in `client/src/hooks/`
3. API calls go in `client/src/services/` (axios-based)
4. Pages go in `client/src/pages/`

### Database Changes

1. Modify `server/src/database/schema.js` for schema changes
2. Update seed data in `server/src/database/seed.js` if needed
3. Run `npm run init-db` to recreate database
4. **Note:** No migrations - this is single-user, development-stage app

### Environment Variables

**Server** (`server/.env`):
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - development/production
- `DATABASE_PATH` - SQLite file path (default: `./database.sqlite`)

**Client** (`client/.env`):
- `VITE_API_URL` - API base URL (default: http://localhost:5000)

## Important Constraints

- **Single-user application:** No authentication system needed
- **SQLite limitations:** Not suitable for concurrent writes, but perfect for single-user desktop app
- **Better-sqlite3 is synchronous:** Do not use `await` with database operations
- **Foreign keys must be enabled:** Done via `db.pragma('foreign_keys = ON')` in database.js
