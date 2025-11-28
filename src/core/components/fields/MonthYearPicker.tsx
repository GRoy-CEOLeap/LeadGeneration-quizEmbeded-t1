import React, { useEffect, useState, useRef } from 'react';
import { Calendar, ChevronDown, Check, Clock } from 'lucide-react';
import { getMinAllowedMonth, getMaxAllowedMonth, isValidMonthYear, formatMonthYearForDisplay } from '../../utils/dateHelpers';

interface MonthYearPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  className?: string;
  onSelectionComplete?: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  value,
  onChange,
  placeholder = 'Select month and year',
  error,
  className = '',
  onSelectionComplete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minMonth, setMinMonth] = useState<string>('');
  const [maxMonth, setMaxMonth] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLimits = () => {
      setMinMonth(getMinAllowedMonth());
      setMaxMonth(getMaxAllowedMonth());
    };

    updateLimits();
    const interval = setInterval(updateLimits, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (value) {
      const [year, month] = value.split('-').map(Number);
      setSelectedMonth(month);
      setSelectedYear(year);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getAvailableYears = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  const isMonthYearValid = (month: number, year: number): boolean => {
    const monthStr = String(month).padStart(2, '0');
    const testValue = `${year}-${monthStr}`;
    return isValidMonthYear(testValue);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    if (selectedYear) {
      const monthStr = String(monthIndex).padStart(2, '0');
      const newValue = `${selectedYear}-${monthStr}`;
      if (isValidMonthYear(newValue)) {
        onChange(newValue);
        setTimeout(() => {
          setIsOpen(false);
          if (onSelectionComplete) {
            setTimeout(() => {
              onSelectionComplete();
            }, 100);
          }
        }, 200);
      }
    } else {
      // Month selected first, wait for year
      // Just update the local state
    }
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    if (selectedMonth) {
      const monthStr = String(selectedMonth).padStart(2, '0');
      const newValue = `${year}-${monthStr}`;
      if (isValidMonthYear(newValue)) {
        onChange(newValue);
        setTimeout(() => {
          setIsOpen(false);
          if (onSelectionComplete) {
            setTimeout(() => {
              onSelectionComplete();
            }, 100);
          }
        }, 200);
      }
    } else {
      // Year selected first, wait for month
      // Just update the local state
    }
  };

  const handleQuickSelect = () => {
    const currentMonthYear = getMaxAllowedMonth();
    const [year, month] = currentMonthYear.split('-').map(Number);
    setSelectedMonth(month);
    setSelectedYear(year);
    onChange(currentMonthYear);
    setTimeout(() => {
      setIsOpen(false);
      if (onSelectionComplete) {
        setTimeout(() => {
          onSelectionComplete();
        }, 100);
      }
    }, 200);
  };

  const togglePicker = () => {
    if (!isOpen && value) {
      // Clear both month and year when reopening after a selection
      setSelectedMonth(null);
      setSelectedYear(null);
      onChange('');
    }
    setIsOpen(!isOpen);
  };

  const isValid = value ? isValidMonthYear(value) : null;
  const displayValue = value ? formatMonthYearForDisplay(value) : '';

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className={`
          relative cursor-pointer
          w-full px-4 py-3 pr-12 border-2 rounded-lg
          transition-all duration-200
          ${error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200' :
            isValid === true ? 'border-green-500 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200' :
            'border-gray-300 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal'}
          ${isOpen ? 'ring-2 ring-teal border-teal' : ''}
          ${className}
        `}
        onClick={togglePicker}
      >
        <input
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none cursor-pointer text-navy font-medium"
          aria-label="Accident date (month and year)"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          {isValid === true && <Check className="w-5 h-5 text-green-500" />}
          <Calendar className={`w-5 h-5 transition-colors ${isOpen ? 'text-teal' : 'text-gray-400'}`} />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            ref={dropdownRef}
            className="bg-white rounded-xl shadow-2xl border-2 border-teal overflow-hidden w-full max-w-lg animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={handleQuickSelect}
              className="w-full px-4 py-4 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 hover:from-teal-600 hover:via-teal-700 hover:to-teal-600 text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 border-b-2 border-teal-700 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:opacity-30 animate-pulse"></div>
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="relative z-10">Last 30 Days (Current Month)</span>
            </button>
            <div className="flex h-80">
              <div className="flex-1 border-r border-gray-200">
                <div className="bg-teal text-white text-center py-3 font-semibold text-sm">
                  Month
                </div>
                <div className="overflow-y-auto h-[17rem] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {MONTHS.map((month, index) => {
                    const monthNum = index + 1;
                    const isDisabled = selectedYear ? !isMonthYearValid(monthNum, selectedYear) : false;
                    const isSelected = selectedMonth === monthNum;

                    return (
                      <button
                        key={month}
                        onClick={() => !isDisabled && handleMonthSelect(monthNum)}
                        disabled={isDisabled}
                        className={`
                          w-full px-4 py-3 text-left transition-all duration-150
                          ${isSelected
                            ? 'bg-teal text-white font-semibold'
                            : isDisabled
                            ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'hover:bg-teal-50 text-gray-800 hover:text-teal-700 font-medium'
                          }
                        `}
                      >
                        {month}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-teal text-white text-center py-3 font-semibold text-sm">
                  Year
                </div>
                <div className="overflow-y-auto h-[17rem] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {getAvailableYears().map((year) => {
                    const isSelected = selectedYear === year;

                    return (
                      <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`
                          w-full px-4 py-3 text-left transition-all duration-150
                          ${isSelected
                            ? 'bg-teal text-white font-semibold'
                            : 'hover:bg-teal-50 text-gray-800 hover:text-teal-700 font-medium'
                          }
                        `}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {displayValue && !error && (
        <p className="mt-1 text-sm text-gray-600">Selected: {displayValue}</p>
      )}
    </div>
  );
};
