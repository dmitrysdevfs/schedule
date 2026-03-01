import {
  startOfMonth,
  startOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  isWeekend,
  addDays,
} from 'date-fns'

/**
 * Generates a grid of days for a given month, including padding from prev/next months
 * to fill a 7x6 grid (consistent calendar layout).
 *
 * @param {Date} viewDate - Any date within the month to generate
 * @param {Date} selectedDate - The currently selected date
 * @param {Date} referenceDate - The reference date for "today" and availability (should be stable)
 * @returns {Array} Array of objects with day info
 */
export const generateCalendarMonth = (
  viewDate,
  selectedDate,
  referenceDate,
  options = { weekStartsOn: 1 },
) => {
  const start = startOfWeek(startOfMonth(viewDate), options)
  const days = eachDayOfInterval({
    start,
    end: addDays(start, 41), // Always 42 days (exactly 6 weeks)
  })
  const today = startOfDay(referenceDate || new Date())

  return days.map((day) => {
    const isOutside = !isSameMonth(day, viewDate)
    const isDisabled =
      (isBefore(startOfDay(day), today) || isWeekend(day)) && !isOutside

    return {
      date: day,
      dayNumber: day.getDate(),
      isOutsideMonth: isOutside,
      isToday: isToday(day),
      isSelected: selectedDate ? isSameDay(day, selectedDate) : false,
      isDisabled: isDisabled,
    }
  })
}

/**
 * Generates an array of time slots for a given day.
 * Default range: 08:00 to 16:30 (30 min steps)
 *
 * @param {number} startHour - The hour to start slots from (0-23)
 * @param {number} endHour - The hour to end slots at (0-23)
 * @param {number} endMinute - The minute to end slots at (0 or 30)
 * @param {number} step - The interval between slots in minutes
 * @returns {Array} Array of strings e.g. ["08:00", "08:30", ...]
 */
export const generateTimeSlots = (
  startHour = 8,
  endHour = 16,
  endMinute = 30,
  step = 30,
) => {
  const slots = []

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      if (hour === endHour && minute > endMinute) break
      const h = hour.toString().padStart(2, '0')
      const m = minute.toString().padStart(2, '0')
      slots.push(`${h}:${m}`)
    }
  }
  return slots
}

/**
 * Calculates how many rows (weeks) are needed to display a given month in a 7-column grid.
 *
 * @param {Date} date - Any date within the month
 * @param {Object} options - date-fns options (e.g. weekStartsOn)
 * @returns {number} Number of rows: 4, 5 or 6
 */
export const getMonthRowCount = (date, options = { weekStartsOn: 1 }) => {
  const startOfGrid = startOfWeek(startOfMonth(date), options)
  const day36 = addDays(startOfGrid, 35) // Start of the 6th week
  const day29 = addDays(startOfGrid, 28) // Start of the 5th week

  if (isSameMonth(day36, date)) return 6
  if (isSameMonth(day29, date)) return 5
  return 4
}
