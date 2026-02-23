import PropTypes from 'prop-types'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const CalendarDay = ({
  day,
  isToday = false,
  isSelected = false,
  isDisabled = false,
  isOutsideMonth = false,
  isActive = false, // 'active' for hover/selection-ready state in calendar
  onClick,
  className,
}) => {
  const baseClasses =
    'w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 text-sm overflow-hidden'

  const statusClasses = clsx({
    // Outside month: transparent and non-interactive
    'text-transparent cursor-default pointer-events-none': isOutsideMonth,

    // Disabled: light text and non-interactive
    'text-white-50 cursor-not-allowed': isDisabled && !isOutsideMonth,

    // Selected: Gold background (highest priority)
    'bg-primary-50 text-primary-400 font-bold': isSelected && !isOutsideMonth,

    // Active (selection-ready): Subtle gold background + Primary color text
    'bg-primary-500/20 text-primary-50':
      isActive && !isSelected && !isDisabled && !isOutsideMonth,

    // Default text color for non-selected non-active days (including Today)
    'text-white-100':
      !isSelected && !isActive && !isDisabled && !isOutsideMonth,

    // Default hover effect for non-selected/non-disabled days
    'hover:bg-secondary-800':
      !isSelected && !isDisabled && !isOutsideMonth && !isActive,

    // Today indicator (The Dot):
    'relative after:content-[""] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full':
      isToday && !isOutsideMonth,

    // Dot color behavior
    'after:bg-white-50': isToday && !isSelected && !isOutsideMonth,
    'after:bg-primary-400': isToday && isSelected && !isOutsideMonth,
  })

  return (
    <button
      type="button"
      aria-label={isToday ? `Today, day ${day}` : `Day ${day}`}
      disabled={isDisabled || isOutsideMonth}
      onClick={onClick}
      className={twMerge(clsx(baseClasses, statusClasses, className))}
    >
      {isOutsideMonth ? null : day}
    </button>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isToday: PropTypes.bool,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOutsideMonth: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default CalendarDay
