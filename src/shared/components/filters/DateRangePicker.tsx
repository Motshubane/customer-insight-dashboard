import React, { useState, useRef, useEffect } from 'react';
import { format, subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

interface Preset {
  label: string;
  days?: number;
  getRange?: () => { start: Date; end: Date };
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const presets: Preset[] = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { 
      label: 'This month', 
      getRange: () => ({ start: startOfMonth(new Date()), end: new Date() }) 
    },
    { 
      label: 'Last month', 
      getRange: () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) };
      }
    },
    { 
      label: 'This year', 
      getRange: () => ({ start: startOfYear(new Date()), end: new Date() }) 
    },
  ];

  const handlePresetClick = (preset: Preset) => {
    if (preset.days) {
      onStartDateChange(subDays(new Date(), preset.days));
      onEndDateChange(new Date());
    } else if (preset.getRange) {
      const range = preset.getRange();
      onStartDateChange(range.start);
      onEndDateChange(range.end);
    }
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: (Date | null)[] = [];
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // Add days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateInRange = (date: Date) => {
    return date >= startDate && date <= endDate;
  };

  const isDateSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd') ||
           format(date, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd');
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="relative" ref={pickerRef}>
      {/* Display selected range */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <CalendarIcon className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700">
          {format(startDate, 'MMM dd, yyyy')} - {format(endDate, 'MMM dd, yyyy')}
        </span>
        <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-[700px] p-4">
          <div className="flex gap-4">
            {/* Presets Sidebar */}
            <div className="w-40 border-r border-gray-200 pr-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Quick Select</h3>
              <div className="space-y-1">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset)}
                    className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="flex-1">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <h3 className="font-medium">
                  {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((date, index) => (
                  <div key={index} className="aspect-square">
                    {date ? (
                      <button
                        onClick={() => {
                          if (!startDate || (startDate && endDate)) {
                            onStartDateChange(date);
                            onEndDateChange(date);
                          } else if (date < startDate) {
                            onStartDateChange(date);
                          } else {
                            onEndDateChange(date);
                          }
                        }}
                        className={`
                          w-full h-full flex items-center justify-center text-sm rounded
                          ${isDateInRange(date) && !isDateSelected(date) ? 'bg-blue-50' : ''}
                          ${isDateSelected(date) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                          ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') 
                            ? 'border border-blue-300' 
                            : ''
                          }
                        `}
                      >
                        {date.getDate()}
                      </button>
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Selected Range Display */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500">Start: </span>
                    <span className="font-medium">{format(startDate, 'MMM dd, yyyy')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">End: </span>
                    <span className="font-medium">{format(endDate, 'MMM dd, yyyy')}</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};