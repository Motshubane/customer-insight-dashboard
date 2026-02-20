# Kopano Bank Customer Spending Insights Dashboard

## Project Overview

Kopano Bank Customer Spending Insights Dashboard is a production-grade financial analytics application built with **React 19** and **TypeScript**. It provides banking professionals with a comprehensive view of customer spending patterns, risk monitoring, and geographic insights through a responsive 3-column interface.

The dashboard features **40+ pages** covering the complete banking domain including customer management, accounts, transactions, loans, risk compliance, investments, and reports.

---

## Key Features

- 40+ banking pages organized into 8 functional groups
- 3-column responsive layout optimized for desktop, tablet, and mobile
- Global filtering system (date ranges, provinces, risk levels, account types)
- Interactive charts using **Recharts**
- Export functionality: CSV and JSON
- Type-safe architecture with **TypeScript**
- Mock data simulation via **Faker** and **TanStack Query**
- Responsive UI with **Tailwind CSS**
- Pagination and search across tables
- Active filter tracking and visual indicators

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | Core UI library |
| TypeScript | 5.9.3 | Type safety and developer experience |
| Vite | 5.4.21 | Fast build tool with HMR |
| TanStack Query | 5.90.21 | Server state management |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| Recharts | 3.7.0 | Composable charting library |
| React Router | 7.13.0 | Declarative routing |
| date-fns | 4.1.0 | Date manipulation |
| Heroicons | 2.2.0 | SVG icon library |
| clsx | 2.1.1 | Conditional className management |
| Vitest | 1.6.1 | Unit testing |
| Testing Library | 15.0.7 | Component testing |

---

## Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone [repository-url]
cd kopano-bank-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Lint, format, and typecheck
npm run lint
npm run format
npm run typecheck