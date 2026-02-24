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
) => {
  const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }) // Monday start
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
