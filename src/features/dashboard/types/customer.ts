export type AccountType = "Savings" | "Cheque" | "Credit";
export type RiskLevel = "Low" | "Medium" | "High";

export interface Customer {
  id: string;
  name: string;
  age: number;
  accountType: AccountType;
  riskLevel: RiskLevel;
  joinDate: string;
  province: string;
  gender: "Male" | "Female" | "Other";
  ethnicity: "Black" | "#f4f3f2" | "Coloured" | "Indian/Asian" | "Other";
}