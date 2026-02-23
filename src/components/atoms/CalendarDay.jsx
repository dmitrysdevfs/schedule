import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const CalendarDay = ({
  day,
  status = 'none', // 'none' | 'disabled' | 'today' | 'active' | 'selected'
  onClick,
  className,
}) => {
  const styles = {
    none: 'text-white-100 hover:bg-secondary-800',
    disabled: 'text-white-50 cursor-not-allowed',
    today: 'text-white-50 relative after:content-[""] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-white-50 after:rounded-full',
    active: 'bg-primary-500/20 text-primary-50',
    selected: 'bg-primary-50 text-primary-400 font-bold',
  }

  return (
    <button
      disabled={status === 'disabled'}
      onClick={onClick}
      className={twMerge(
        clsx(
          'w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 text-sm overflow-hidden',
          styles[status],
          className,
        ),
      )}
    >
      {status !== 'none' ? day : null}
    </button>
  )
}

export default CalendarDay
