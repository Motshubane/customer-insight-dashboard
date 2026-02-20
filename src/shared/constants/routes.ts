export const ROUTES = {
  // Dashboard
  DASHBOARD: '/',
  BRANCH_PERFORMANCE: '/branch-performance',
  REGIONAL_OVERVIEW: '/regional-overview',
  DAILY_SNAPSHOT: '/daily-snapshot',
  KEY_METRICS: '/key-metrics',

  // Customer Management
  CUSTOMER_LIST: '/customers',
  HIGH_NET_WORTH: '/customers/high-net-worth',
  CORPORATE_CLIENTS: '/customers/corporate',
  SME_CUSTOMERS: '/customers/sme',
  YOUTH_ACCOUNTS: '/customers/youth',
  SENIOR_CITIZENS: '/customers/senior',
  DORMANT_ACCOUNTS: '/customers/dormant',
  CUSTOMER_ONBOARDING: '/customers/onboarding',

  // Accounts
  ACCOUNTS_OVERVIEW: '/accounts',
  SAVINGS_ACCOUNTS: '/accounts/savings',
  CHEQUE_ACCOUNTS: '/accounts/cheque',
  CREDIT_CARDS: '/accounts/credit-cards',
  FIXED_DEPOSITS: '/accounts/fixed-deposits',
  FOREIGN_CURRENCY: '/accounts/foreign-currency',

  // Transactions
  TRANSACTION_MONITOR: '/transactions',
  PENDING_APPROVALS: '/transactions/pending',
  FAILED_TRANSACTIONS: '/transactions/failed',
  LARGE_TRANSACTIONS: '/transactions/large',
  INTERNATIONAL_TRANSFERS: '/transactions/international',

  // Loans
  LOAN_PORTFOLIO: '/loans',
  MORTGAGE_LOANS: '/loans/mortgage',
  VEHICLE_FINANCE: '/loans/vehicle',
  PERSONAL_LOANS: '/loans/personal',
  BUSINESS_LOANS: '/loans/business',
  NON_PERFORMING_LOANS: '/loans/non-performing',

  // Risk & Compliance
  RISK_DASHBOARD: '/risk',
  FRAUD_DETECTION: '/risk/fraud',
  AML_ALERTS: '/risk/aml',
  KYC_STATUS: '/risk/kyc',
  REGULATORY_REPORTS: '/risk/regulatory',

  // Investments
  INVESTMENT_PORTFOLIO: '/investments',
  UNIT_TRUSTS: '/investments/unit-trusts',
  STOCK_TRADING: '/investments/stocks',
  FIXED_INCOME: '/investments/fixed-income',

  // Reports
  CUSTOM_REPORTS: '/reports/custom',
  DATA_EXPORT: '/reports/export',
  AUDIT_LOGS: '/reports/audit',
  PERFORMANCE_ANALYTICS: '/reports/analytics',
} as const;