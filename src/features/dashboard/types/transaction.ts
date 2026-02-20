// -----------------------------
// Transaction category type
// -----------------------------
export type TransactionCategory =
  | "Groceries"
  | "Utilities"
  | "ATM Withdrawal"
  | "Online Payment"
  | "Salary Deposit"
  | "Loan Repayment"
  | "Transfer";

// -----------------------------
// Transaction type
// -----------------------------
export type TransactionType = "Debit" | "Credit";

// -----------------------------
// Base Transaction interface
// -----------------------------
export interface Transaction {
  id: string;
  customerId: string;
  category: TransactionCategory;
  amount: number;
  date: string;
  type: TransactionType;
}

// -----------------------------
// Enriched Transaction
// -----------------------------
import type { AccountType, RiskLevel } from "./customer";

export interface EnrichedTransaction extends Transaction {
  customerName: string;
  province: string;
  gender: string;
  ethnicity: string;
  accountType: AccountType;
  riskLevel: RiskLevel;
  flagged: boolean;
}
