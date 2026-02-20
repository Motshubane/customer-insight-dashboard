export interface DashboardMetric {
  name: string;
  value: number;
}

export interface DashboardInsight {
  title: string;
  trend: "up" | "down" | "neutral";
}

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  date?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Fetch Dashboard Metrics
export const fetchDashboardMetrics = async (): Promise<DashboardMetric[]> => {
  await delay(500); // simulate network latency
  return [
    { name: "Revenue", value: 125000 },
    { name: "Active Users", value: 5420 },
    { name: "Orders", value: 3120 },
  ];
};

// Fetch Dashboard Insights
export const fetchDashboardInsights = async (): Promise<DashboardInsight[]> => {
  await delay(500);
  return [
    { title: "Sales increased", trend: "up" },
    { title: "User growth stable", trend: "neutral" },
    { title: "Support tickets decreased", trend: "down" },
  ];
};

// Fetch Recent Transactions
export const fetchRecentTransactions = async (): Promise<Transaction[]> => {
  await delay(500);
  return [
    { id: "TXN001", customer: "John Doe", amount: 500, date: "2026-02-17" },
    { id: "TXN002", customer: "Jane Smith", amount: 1200, date: "2026-02-16" },
    { id: "TXN003", customer: "Alice Brown", amount: 800, date: "2026-02-15" },
  ];
};
