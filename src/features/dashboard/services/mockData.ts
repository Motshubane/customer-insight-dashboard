import { subDays, format } from 'date-fns';
import type { 
  Customer, 
  Transaction, 
  Province, 
  RiskLevel, 
  AccountStatus,
  CustomerType 
} from '@/shared/types';

// Generate 100 customers with enhanced data
export const generateCustomers = (): Customer[] => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Mary', 'Robert', 'Patricia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const provinces: Province[] = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Mpumalanga', 'Limpopo', 'North West', 'Northern Cape'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'Kopano.co.za', 'webmail.co.za'];
  
  return Array(100).fill(null).map((_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    
    // Randomly select from the actual data types (no 'All')
    const accountTypes: CustomerType[] = ['Savings', 'Cheque', 'Credit'];
    const riskLevels: RiskLevel[] = ['Low', 'Medium', 'High'];
    const accountStatuses: AccountStatus[] = ['Active', 'Dormant', 'Frozen', 'Closed'];
    const genders = ['Male', 'Female', 'Other'] as const;
    
    return {
      id: `cust-${index}`,
      name: `${firstName} ${lastName}`,
      email,
      phone: `+27 ${Math.floor(Math.random() * 100000000)}`.slice(0, 12),
      age: Math.floor(Math.random() * 50) + 20,
      accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
      riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      accountStatus: accountStatuses[Math.floor(Math.random() * accountStatuses.length)],
      joinDate: format(subDays(new Date(), Math.floor(Math.random() * 1000)), 'yyyy-MM-dd'),
      province: provinces[Math.floor(Math.random() * provinces.length)],
      gender: genders[Math.floor(Math.random() * genders.length)],
      totalBalance: Math.floor(Math.random() * 1000000) + 10000,
      monthlyIncome: Math.floor(Math.random() * 50000) + 5000,
      creditScore: Math.floor(Math.random() * 400) + 300,
      lastTransaction: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
    };
  });
};

// Generate 500 transactions with enhanced data
export const generateTransactions = (customers: Customer[]): Transaction[] => {
  const categories = ['Retail', 'Groceries', 'Fuel', 'Utilities', 'Restaurant', 'Travel', 'Healthcare', 'Education', 'Entertainment', 'Transfer'];
  const descriptions = [
    'Payment to Shoprite', 'Woolworths purchase', 'Engen fuel', 'Eskom bill', 
    'Netflix subscription', 'Uber trip', 'Dis-Chem pharmacy', 'Takealot order',
    'Salary deposit', 'Interest payment'
  ];
  const statuses = ['Completed', 'Pending', 'Failed'] as const;
  const types = ['debit', 'credit'] as const;
  
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < 500; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const date = subDays(new Date(), Math.floor(Math.random() * 60));
    const amount = Math.floor(Math.random() * 20000) + 50;
    const type = types[Math.random() > 0.3 ? 0 : 1];
    
    transactions.push({
      id: `tx-${i}`,
      customerId: customer.id,
      customerName: customer.name,
      amount,
      date: format(date, 'yyyy-MM-dd HH:mm:ss'),
      category: categories[Math.floor(Math.random() * categories.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type,
      flagged: Math.random() > 0.9,
      riskScore: Math.floor(Math.random() * 100),
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockCustomers = generateCustomers();
export const mockTransactions = generateTransactions(mockCustomers);

// Re-export the types for convenience
export type { Customer, Transaction };