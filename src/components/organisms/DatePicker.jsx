import { useState } from 'react'
import {
  format,
  addMonths,
  subMonths,
  isSameMonth,
  startOfMonth,
} from 'date-fns'
import { useBookingStore } from '../../store/useBookingStore'
import { generateCalendarMonth } from '../../utils/calendar'
import CalendarDay from '../atoms/CalendarDay'
import { clsx } from 'clsx'
import { toZonedTime } from 'date-fns-tz'

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const DatePicker = () => {
  const { selectedDate, setSelectedDate, timezone, setTimezone } =
    useBookingStore()
  const [viewDate, setViewDate] = useState(new Date())
  const [isTzOpen, setIsTzOpen] = useState(false)

  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const calendarDays = generateCalendarMonth(
    viewDate,
    selectedDate ? new Date(selectedDate) : null,
  )

  const handlePrevMonth = () => {
    if (canGoPrev) setViewDate(subMonths(viewDate, 1))
  }
  const handleNextMonth = () => setViewDate(addMonths(viewDate, 1))

  const handleDateClick = (date) => {
    const dateIso = date.toISOString()
    if (selectedDate === dateIso) {
      setSelectedDate(null)
    } else {
      setSelectedDate(dateIso)
    }
  }

  const handleTzSelect = (tz) => {
    setTimezone(tz)
    setIsTzOpen(false)
  }

  const todayMonth = startOfMonth(new Date())
  const canGoPrev = !isSameMonth(viewDate, todayMonth)

  return (
    <div className="w-full max-w-[440px] bg-secondary-800 rounded-3xl p-8 shadow-2xl border border-white-25 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 px-2">
        {/* Prev Month Button */}
        <button
          onClick={handlePrevMonth}
          disabled={!canGoPrev}
          className={clsx(
            'flex items-center justify-center rounded-full transition-all duration-200',
            {
              'w-10 h-10 text-white-25 cursor-not-allowed': !canGoPrev,
              'w-14 h-14 bg-primary-500/20 text-primary-50 hover:bg-primary-500/30':
                canGoPrev,
            },
          )}
          aria-label="Previous month"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Month Year Label */}
        <h3 className="text-xl font-medium text-white-100 text-center flex-1">
          {format(viewDate, 'MMMM yyyy')}
        </h3>

        {/* Next Month Button (Large Active Circle) */}
        <button
          onClick={handleNextMonth}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-500/20 text-primary-50 hover:bg-primary-500/30 transition-all duration-200"
          aria-label="Next month"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* WeekDays Labels */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-[12px] leading-4 font-normal tracking-widest text-white-100"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-3 justify-items-center">
        {calendarDays.map((day, idx) => (
          <CalendarDay
            key={idx}
            day={day.dayNumber}
            isToday={day.isToday}
            isSelected={day.isSelected}
            isDisabled={day.isDisabled}
            isOutsideMonth={day.isOutsideMonth}
            // Logic: Available days get bubbles (Active state). Today always has a dot.
            isActive={!day.isDisabled && !day.isOutsideMonth}
            onClick={() => handleDateClick(day.date)}
          />
        ))}
      </div>

      {/* Timezone Footer */}
      <div className="mt-10 pt-8 border-t border-white-25 relative">
        <h4 className="text-sm font-bold text-white-100 mb-4">Time zone</h4>
        <div className="flex items-center gap-3 text-sm text-white-100 relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white-100"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <div className="relative">
            <div
              onClick={() => setIsTzOpen(!isTzOpen)}
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span>
                {timezone === 'Europe/Berlin' || timezone === 'CET'
                  ? 'Central European Time'
                  : timezone}{' '}
                (
                {format(
                  toZonedTime(new Date(), timezone),
                  'h:mm aaa',
                ).toLowerCase()}
                )
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={clsx('mt-1 transition-transform duration-200', {
                  'rotate-180': isTzOpen,
                })}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Timezone Dropdown */}
            {isTzOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-secondary-100 border border-white-25 rounded-xl shadow-2xl overflow-hidden z-50">
                <button
                  onClick={() => handleTzSelect(localTz)}
                  className={clsx(
                    'w-full px-4 py-3 text-left text-sm hover:bg-secondary-800 transition-colors',
                    { 'text-primary-100 font-bold': timezone === localTz },
                  )}
                >
                  Local Time ({localTz})
                </button>
                <button
                  onClick={() => handleTzSelect('Europe/Berlin')}
                  className={clsx(
                    'w-full px-4 py-3 text-left text-sm hover:bg-secondary-800 transition-colors border-t border-white-10',
                    {
                      'text-primary-100 font-bold':
                        timezone === 'Europe/Berlin' || timezone === 'CET',
                    },
                  )}
                >
                  Central European Time (CET)
                </button>
                <button
                  onClick={() => handleTzSelect('UTC')}
                  className={clsx(
                    'w-full px-4 py-3 text-left text-sm hover:bg-secondary-800 transition-colors border-t border-white-10',
                    { 'text-primary-100 font-bold': timezone === 'UTC' },
                  )}
                >
                  UTC (Universal Coordinated Time)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
