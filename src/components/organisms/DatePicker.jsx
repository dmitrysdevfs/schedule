import { useState, useMemo, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import {
  format,
  addMonths,
  subMonths,
  isSameMonth,
  startOfMonth,
} from 'date-fns'
import { generateCalendarMonth } from '../../utils/calendar'
import CalendarDay from '../atoms/CalendarDay'
import { clsx } from 'clsx'
import { toZonedTime } from 'date-fns-tz'
import {
  SUPPORTED_TIMEZONES,
  getTimezoneLabel,
} from '../../constants/timezones'

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const TimeDisplay = memo(({ timezone }) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000) // Update every 30s
    return () => clearInterval(timer)
  }, [])

  return (
    <span>{format(toZonedTime(now, timezone), 'h:mm aaa').toLowerCase()}</span>
  )
})

TimeDisplay.displayName = 'TimeDisplay'
TimeDisplay.propTypes = {
  timezone: PropTypes.string.isRequired,
}

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  timezone,
  setTimezone,
}) => {
  const [viewDate, setViewDate] = useState(new Date())
  const [isTzOpen, setIsTzOpen] = useState(false)
  const [focusedTzIndex, setFocusedTzIndex] = useState(-1)

  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      if (now.getDate() !== today.getDate()) {
        setToday(now)
      }
    }, 60000) // Check every minute
    return () => clearInterval(timer)
  }, [today])

  const calendarDays = useMemo(
    () =>
      generateCalendarMonth(
        viewDate,
        selectedDate ? new Date(selectedDate) : null,
        today,
      ),
    [viewDate, selectedDate, today],
  )

  const handlePrevMonth = () => {
    if (canGoPrev) setViewDate(subMonths(viewDate, 1))
  }
  const handleNextMonth = () => setViewDate(addMonths(viewDate, 1))

  const handleDateClick = (date) => {
    const dateIso = format(date, 'yyyy-MM-dd')
    if (selectedDate === dateIso) {
      setSelectedDate(null)
    } else {
      setSelectedDate(dateIso)
    }
  }

  const handleTzSelect = (tz) => {
    setTimezone(tz)
    setIsTzOpen(false)
    setFocusedTzIndex(-1)
  }

  const handleTzKeyDown = (e) => {
    if (!isTzOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsTzOpen(true)
        setFocusedTzIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedTzIndex((prev) => (prev + 1) % SUPPORTED_TIMEZONES.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedTzIndex(
          (prev) =>
            (prev - 1 + SUPPORTED_TIMEZONES.length) %
            SUPPORTED_TIMEZONES.length,
        )
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedTzIndex >= 0) {
          handleTzSelect(SUPPORTED_TIMEZONES[focusedTzIndex].id)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsTzOpen(false)
        setFocusedTzIndex(-1)
        break
      case 'Tab':
        setIsTzOpen(false)
        setFocusedTzIndex(-1)
        break
      default:
        break
    }
  }

  const todayMonth = startOfMonth(today)
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
              'w-14 h-14 text-white-25 cursor-not-allowed opacity-50':
                !canGoPrev,
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
        {calendarDays.map((day) => (
          <CalendarDay
            key={day.date.getTime()}
            day={day.dayNumber}
            isToday={day.isToday}
            isSelected={day.isSelected}
            isDisabled={day.isDisabled}
            isOutsideMonth={day.isOutsideMonth}
            // Logic: Available days get bubbles (Active state). Today always has a dot.
            isActive={!day.isDisabled && !day.isOutsideMonth}
            onClick={() =>
              !day.isOutsideMonth &&
              !day.isDisabled &&
              handleDateClick(day.date)
            }
          />
        ))}
      </div>

      {/* Timezone Footer */}
      <div className="mt-10 pt-8 border-t border-white-25 relative">
        <h4 className="text-sm font-bold text-white-100 mb-4">Time zone</h4>
        <div
          className="flex items-center gap-3 text-sm text-white-100 relative"
          onKeyDown={handleTzKeyDown}
        >
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
            <button
              type="button"
              id="tz-trigger"
              onClick={() => setIsTzOpen(!isTzOpen)}
              aria-expanded={isTzOpen}
              aria-haspopup="listbox"
              aria-controls="tz-listbox"
              aria-activedescendant={
                focusedTzIndex >= 0 ? `tz-opt-${focusedTzIndex}` : undefined
              }
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity text-left text-white-100"
            >
              <span>
                {getTimezoneLabel(timezone)} (
                <TimeDisplay timezone={timezone} />)
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
            </button>

            {/* Timezone Dropdown */}
            {isTzOpen && (
              <div
                role="listbox"
                id="tz-listbox"
                aria-labelledby="tz-trigger"
                className="absolute bottom-full left-0 mb-2 w-64 bg-secondary-100 border border-white-25 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                {SUPPORTED_TIMEZONES.map((tz, index) => (
                  <button
                    key={tz.id}
                    id={`tz-opt-${index}`}
                    type="button"
                    role="option"
                    aria-selected={timezone === tz.id}
                    onClick={() => handleTzSelect(tz.id)}
                    className={clsx(
                      'w-full px-4 py-3 text-left text-sm hover:bg-secondary-800 transition-colors border-t border-white-10 first:border-t-0 outline-none',
                      {
                        'text-primary-100 font-bold': timezone === tz.id,
                        'bg-secondary-800': focusedTzIndex === index,
                      },
                    )}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  setTimezone: PropTypes.func.isRequired,
}

export default DatePicker
