import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Clock, Check } from 'lucide-react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  placeholder?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  placeholder = 'Select Travel Start & End Dates',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => startDate || new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Month navigation
  const prevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Days matrix for current month view
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
  const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Helper to format Date
  const formatDateLabel = (d: Date | null) => {
    if (!d) return '';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Helper to calculate nights count
  const calculateNights = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(startDate, endDate);

  const handleDayClick = (dayNum: number) => {
    const clickedDate = new Date(viewYear, viewMonth, dayNum);
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate < today) return; // Prevent selecting past dates

    if (!startDate || (startDate && endDate)) {
      // First click: Set Start Date, clear End Date
      onChange(clickedDate, null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        // If clicked date is before start date, treat as new start date
        onChange(clickedDate, null);
      } else {
        // Second click: Set End Date
        onChange(startDate, clickedDate);
        setIsOpen(false); // Auto close once range selected
      }
    }
  };

  // Preset quick selections
  const applyPreset = (daysDuration: number, startOffsetDays: number = 14) => {
    const start = new Date();
    start.setDate(start.getDate() + startOffsetDays);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + daysDuration);
    end.setHours(0, 0, 0, 0);

    setViewDate(start);
    onChange(start, end);
    setIsOpen(false);
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isInRange = (d: Date) => {
    if (startDate && endDate) {
      return d > startDate && d < endDate;
    }
    if (startDate && !endDate && hoverDate) {
      return d > startDate && d <= hoverDate;
    }
    return false;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input Field Display Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2 text-left text-sm flex items-center justify-between transition-all ${
          isOpen ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <CalendarIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {startDate ? (
            <div className="truncate flex items-center gap-1.5 text-xs">
              <span className="font-extrabold text-emerald-300">{formatDateLabel(startDate)}</span>
              <span className="text-slate-500">➔</span>
              <span className="font-extrabold text-emerald-300">
                {endDate ? formatDateLabel(endDate) : 'Select End Date...'}
              </span>
              {nights > 0 && (
                <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold ml-1">
                  {nights} Nights ({nights + 1} Days)
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-500 text-xs truncate">{placeholder}</span>
          )}
        </div>

        {startDate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null, null);
            }}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            title="Clear Dates"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </button>

      {/* Popover Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-[320px] bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl p-3.5 text-slate-100 text-xs animate-in fade-in zoom-in-95 duration-150">
          
          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-2.5 border-b border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block w-full mb-0.5">
              Quick Trip Duration Presets:
            </span>
            <button
              type="button"
              onClick={() => applyPreset(5, 14)}
              className="bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600 border border-slate-700 px-2 py-1 rounded-lg text-[10px] font-bold transition-all"
            >
              5N/6D (2 Wks)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(4, 7)}
              className="bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600 border border-slate-700 px-2 py-1 rounded-lg text-[10px] font-bold transition-all"
            >
              4N/5D (Next Wk)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(3, 20)}
              className="bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600 border border-slate-700 px-2 py-1 rounded-lg text-[10px] font-bold transition-all"
            >
              3N/4D (Zuluk)
            </button>
          </div>

          {/* Month Header Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-extrabold text-sm text-slate-100">
              {monthNames[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 mb-1">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank offset cells for first day of month */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`blank-${idx}`} className="py-1.5" />
            ))}

            {/* Actual day cells */}
            {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const cellDate = new Date(viewYear, viewMonth, dayNum);
              cellDate.setHours(0, 0, 0, 0);

              const isPast = cellDate < today;
              const isStart = isSameDay(cellDate, startDate);
              const isEnd = isSameDay(cellDate, endDate);
              const isRange = isInRange(cellDate);

              let cellStyle = 'bg-slate-950 text-slate-200 hover:bg-slate-800';
              if (isPast) {
                cellStyle = 'text-slate-600 opacity-40 cursor-not-allowed';
              } else if (isStart || isEnd) {
                cellStyle = 'bg-emerald-500 text-slate-950 font-black shadow-lg scale-105';
              } else if (isRange) {
                cellStyle = 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/50';
              }

              return (
                <button
                  type="button"
                  key={dayNum}
                  disabled={isPast}
                  onClick={() => handleDayClick(dayNum)}
                  onMouseEnter={() => setHoverDate(cellDate)}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-all ${cellStyle}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Status Bar / Selection Guide */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <div>
              {!startDate && 'Step 1: Pick Start Date'}
              {startDate && !endDate && 'Step 2: Pick Checkout / End Date'}
              {startDate && endDate && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{nights} Nights Selected</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-emerald-400 hover:underline font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
