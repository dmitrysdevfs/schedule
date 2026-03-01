import PropTypes from 'prop-types'
import { clsx } from 'clsx'
import { LAYOUT_CONFIG } from '../../constants/layout'

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  maxLength,
  className,
}) => {
  return (
    <div
      className={clsx('flex flex-col gap-2')}
      style={{ width: `${LAYOUT_CONFIG.FIELD_WIDTH}rem` }}
    >
      <label className="text-white-100 text-[13px] leading-[18px] font-medium whitespace-nowrap">
        {label} {required && <span className="text-primary-200">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ height: `${LAYOUT_CONFIG.TEXTAREA_HEIGHT}rem` }}
        className={clsx(
          'w-full bg-secondary-800 border rounded-xl px-4 py-2 text-white-100 text-[16px] transition-all outline-none resize-none',
          error
            ? 'border-error-100'
            : 'border-white-25 focus:border-primary-200',
          className,
        )}
      />
      {error && <span className="text-error-100 text-[12px]">{error}</span>}
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
}

export default TextArea
