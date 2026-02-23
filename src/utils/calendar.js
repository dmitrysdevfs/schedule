import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  isWeekend,
} from 'date-fns'

/**
 * Generates a grid of days for a given month, including padding from prev/next months
 * to fill a 7x6 grid (consistent calendar layout).
 *
 * @param {Date} date - Any date within the month to generate
 * @returns {Array} Array of objects with day info
 */
export const generateCalendarMonth = (viewDate, selectedDate) => {
  const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }) // Monday start
  const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start, end })
  const today = startOfDay(new Date())

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
