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

/**
 * Generates an array of time slots for a given day.
 * Default range: 08:00 to 16:30 (30 min steps)
 *
 * @returns {Array} Array of strings e.g. ["8:00", "8:30", ...]
 */
export const generateTimeSlots = () => {
  const slots = []
  const startHour = 8
  const endHour = 16
  const endMinute = 30

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute <= 30; minute += 30) {
      if (hour === endHour && minute > endMinute) break
      const h = hour.toString().padStart(2, '0')
      const m = minute === 0 ? '00' : '30'
      slots.push(`${h}:${m}`)
    }
  }
  return slots
}
