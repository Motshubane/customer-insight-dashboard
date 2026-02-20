# Architecture Documentation

---

## Data Flow

**Cycle:**

1. User interacts → Event handler  
2. Update Context / filters  
3. TanStack Query fetches or simulates data  
4. Component re-renders

**Example:** Filtering customers by risk level:

```ts
const { filteredCustomers } = useCustomerFilters(allCustomers);
State Management

Global UI State: Context API (FilterContext)

Server State: TanStack Query (mocked API)

Component UI State: Local useState or useReducer

Mock Data Architecture

Purpose: Fast development without backend

Realism: Faker.js distributions mimic production

Future-proof: API layer abstraction allows swap to real backend

export const generateCustomers = (): Customer[] => {
  // 60% Low, 30% Medium, 10% High risk
};
Rendering Flow
App
├── Providers
├── Layout
│   ├── Sidebar
│   ├── Topbar
│   └── Main Content
└── Routes (lazy loaded)

Components lazy load per route

Generic Table, Card, Button components used for reusability