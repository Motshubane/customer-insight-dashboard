import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportToCSV, exportToJSON, exportToPDF } from '@/shared/utils/export';
import { useNotifications } from '@/contexts/useNotifications'; // Changed this line
import { useAnalytics } from '@/shared/hooks/useAnalytics';

export type ExportFormat = 'csv' | 'json' | 'pdf';

export interface ExportButtonProps<T = Record<string, unknown>> {
  data: T[];
  filename: string;
  title?: string;
  formats?: ExportFormat[];
  onExport?: (format: ExportFormat) => void;
}

export function ExportButton<T extends Record<string, unknown>>({ 
  data,
  filename,
  title = 'Export Data',
  formats = ['csv', 'json'],
  onExport,
}: ExportButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { showNotification } = useNotifications(); // This will now work
  const { trackExport } = useAnalytics();

  const handleExport = async (format: ExportFormat) => {
    if (!data.length) {
      showNotification('warning', 'No Data', 'There is no data to export');
      return;
    }

    setIsExporting(true);

    try {
      switch (format) {
        case 'csv':
          exportToCSV(data, filename);
          trackExport('csv', data.length);
          break;
        case 'json':
          exportToJSON(data, filename);
          trackExport('json', data.length);
          break;
        case 'pdf':
          await exportToPDF(data, filename, title);
          trackExport('pdf', data.length);
          break;
      }
      
      showNotification('success', 'Export Complete', `Data exported as ${format.toUpperCase()}`);
      onExport?.(format);
    } catch (error) {
      showNotification('error', 'Export Failed', 'There was an error exporting your data');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        {isExporting ? 'Exporting...' : 'Export'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            {formats.includes('csv') && (
              <button
                onClick={() => handleExport('csv')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as CSV
              </button>
            )}
            {formats.includes('json') && (
              <button
                onClick={() => handleExport('json')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as JSON
              </button>
            )}
            {formats.includes('pdf') && (
              <button
                onClick={() => handleExport('pdf')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as PDF
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportButton;