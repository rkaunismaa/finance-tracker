# Finance Tracker - Development Plan

Personal finance tracker web application with income/expense tracking, savings goals, and data visualizations.

## Phase 1: Foundation ✅

**Commit:** `90d6022`

### Objectives
- Set up monorepo structure with client and server directories
- Initialize React frontend with Vite and Tailwind CSS
- Initialize Express backend with SQLite database
- Design and implement database schema
- Seed default categories

### Deliverables
- `/client` - Vite + React 18 + Tailwind CSS setup
- `/server` - Express.js with ES modules
- Database schema with tables:
  - `categories` - Income/expense categories with color and icon
  - `transactions` - Financial transactions linked to categories
  - `savings_goals` - Savings targets with progress tracking
- 15 pre-seeded categories (10 expense, 5 income)
- Development scripts with concurrently for running both servers

---

## Phase 2: Backend API Implementation ✅

**Commit:** `f1d7e4f`

### Objectives
- Implement RESTful API endpoints for all resources
- Add validation middleware with express-validator
- Create custom error handling system
- Build analytics endpoints for financial insights

### API Endpoints

#### Categories
- `GET /api/categories` - List all categories (with optional type filter)
- `GET /api/categories/:id` - Get single category

#### Transactions
- `GET /api/transactions` - List transactions (with filters: type, category_id, date range, pagination)
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

#### Savings Goals
- `GET /api/goals` - List goals (with optional status filter)
- `GET /api/goals/:id` - Get single goal
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal (auto-completes when target reached)
- `DELETE /api/goals/:id` - Delete goal

#### Analytics
- `GET /api/analytics/summary` - Total income, expenses, and balance
- `GET /api/analytics/by-category` - Breakdown by category
- `GET /api/analytics/trends` - Monthly income/expense trends

### Architecture
- Repository pattern with models handling database operations
- Thin controllers for request/response handling
- Centralized validation middleware
- Custom error classes (NotFoundError, ValidationError, DatabaseError)

---

## Phase 3: Frontend Implementation ✅

**Commit:** `5a02711`

### Objectives
- Build complete React UI with reusable components
- Implement React Query hooks for data fetching
- Create dashboard with charts and visualizations
- Build CRUD interfaces for transactions and goals

### Components Structure

```
client/src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button       # Variants: primary, secondary, danger, success, ghost, outline
│   │   ├── Card         # With Header, Title, Description, Content, Footer
│   │   ├── Modal        # With escape key and backdrop click handling
│   │   ├── Input        # With labels, errors, prefix/suffix
│   │   ├── Select       # Styled dropdown
│   │   ├── Badge        # Status indicators
│   │   ├── LoadingSpinner
│   │   └── EmptyState
│   ├── layout/
│   │   ├── Layout       # Main app wrapper with Outlet
│   │   ├── Sidebar      # Navigation with active states
│   │   └── Header       # Page headers with actions
│   ├── dashboard/
│   │   ├── SummaryCards # Income, expense, balance cards
│   │   ├── RecentTransactions
│   │   └── GoalsOverview
│   ├── charts/
│   │   ├── TrendsChart  # Monthly line chart (Recharts)
│   │   └── CategoryBreakdown # Pie chart by category
│   ├── transactions/
│   │   ├── TransactionList
│   │   ├── TransactionForm
│   │   ├── TransactionFilters
│   │   └── DeleteConfirmation
│   └── goals/
│       ├── GoalCard
│       ├── GoalForm
│       └── UpdateProgressModal
├── hooks/               # React Query hooks
│   ├── useCategories
│   ├── useTransactions  # CRUD with cache invalidation
│   ├── useGoals         # CRUD with cache invalidation
│   └── useAnalytics     # Summary, by-category, trends
├── pages/
│   ├── Dashboard
│   ├── Transactions
│   ├── Goals
│   └── Settings
├── services/            # API client layer
│   ├── api.js           # Axios instance
│   ├── transactionsService
│   ├── categoriesService
│   ├── goalsService
│   └── analyticsService
└── utils/
    ├── constants        # API endpoints, enums
    ├── format           # Currency, date formatting
    └── icons            # Lucide icon mapping
```

### Features
- **Dashboard**: Summary cards, monthly trends chart, category breakdown, recent transactions, goals overview
- **Transactions**: Filterable list, create/edit modal, type toggle (income/expense), delete confirmation
- **Goals**: Progress tracking, color-coded cards, add progress modal, status management (active/completed/archived)
- **Routing**: React Router with nested routes and layout wrapper

---

## Future Enhancements (Not Implemented)

### Phase 4: Polish & Features
- [ ] Settings page implementation (currency, date format preferences)
- [ ] Dark mode support
- [ ] Data export (CSV, PDF)
- [ ] Recurring transactions
- [ ] Budget limits per category
- [ ] Mobile-responsive improvements

### Phase 5: Advanced Features
- [ ] Bill reminders and notifications
- [ ] Multi-currency support
- [ ] Data import from bank statements
- [ ] Year-over-year comparisons
- [ ] Goal milestones and celebrations

---

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS (custom color palette)
- React Query (server state)
- Zustand (client state - planned)
- Recharts (visualizations)
- Lucide React (icons)
- React Router DOM
- Axios
- date-fns

### Backend
- Node.js + Express (ES modules)
- SQLite with better-sqlite3 (synchronous API)
- express-validator
- morgan (logging)
- cors

---

## Running the Application

```bash
# Install dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Initialize database
npm run init-db

# Run development servers
npm run dev

# Access the app
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```
