import type { Customer, Transaction } from '@/shared/types';

export const prepareCustomerDataForExport = (customers: Customer[]) => {
  return customers.map(c => ({
    Name: c.name,
    Email: c.email,
    Phone: c.phone,
    'Account Type': c.accountType,
    'Risk Level': c.riskLevel,
    Status: c.accountStatus,
    Province: c.province,
    Balance: c.totalBalance,
    'Monthly Income': c.monthlyIncome,
    'Credit Score': c.creditScore,
    'Join Date': c.joinDate,
    'Last Transaction': c.lastTransaction,
  }));
};

export const prepareTransactionDataForExport = (transactions: Transaction[]) => {
  return transactions.map(t => ({
    Date: new Date(t.date).toLocaleDateString(),
    Customer: t.customerName,
    Category: t.category,
    Amount: t.amount,
    Type: t.type,
    Status: t.status,
    Flagged: t.flagged ? 'Yes' : 'No',
    Description: t.description || '',
  }));
};

export const exportToCSV = <T extends Record<string, unknown>>(data: T[], filename: string) => {
  if (!data.length) {
    console.warn('No data to export');
    return;
  }

  try {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : String(value)
      ).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};

export const exportToJSON = <T>(data: T[], filename: string) => {
  if (!data.length) {
    console.warn('No data to export');
    return;
  }

  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting JSON:', error);
    throw error;
  }
};

export const exportToPDF = async <T>(data: T[], filename: string, title: string) => {
  console.log('Exporting to PDF:', { data, filename, title });
  
  // In a real implementation, you would use a library like jsPDF
  // For now, show a notification that PDF export is coming soon
  alert('PDF export will be implemented with a library like jsPDF');
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));
};