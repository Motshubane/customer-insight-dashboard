export interface EnrichedTransaction {
  id: string;
  customerName: string;
  province: string;
  gender: string;
  ethnicity: string;
  accountType: "Savings" | "Cheque" | "Credit";
  riskLevel: "Low" | "Medium" | "High";
  flagged: boolean;
}
