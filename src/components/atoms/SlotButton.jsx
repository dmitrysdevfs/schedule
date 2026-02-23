import PropTypes from 'prop-types'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const SlotButton = ({
  time,
  isSelected = false,
  isDisabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={twMerge(
        clsx(
          'w-full h-[40px] px-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm',
          'active:border-primary-500/20 active:text-primary-400 active:bg-secondary',
          isSelected
            ? 'bg-primary-100 border-primary-100 text-secondary'
            : isDisabled
              ? 'border-grey-300 text-grey-300 bg-transparent'
              : 'bg-transparent border-primary-100 text-primary-300 hover:border-primary-300 hover:bg-secondary',
          className,
        ),
      )}
    >
      {time}
    </button>
  )
}

SlotButton.propTypes = {
  time: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default SlotButton
