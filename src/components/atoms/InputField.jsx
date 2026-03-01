import PropTypes from 'prop-types'
import { clsx } from 'clsx'
import { LAYOUT_CONFIG } from '../../constants/layout'

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  error,
  className,
}) => {
  return (
    <div
      className={clsx('flex flex-col gap-2')}
      style={{ width: `${LAYOUT_CONFIG.FIELD_WIDTH}rem` }}
    >
      <label className="text-white-100 text-[14px] leading-[18px] font-medium">
        {label} {required && <span className="text-primary-200">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ height: `${LAYOUT_CONFIG.INPUT_HEIGHT}rem` }}
        className={clsx(
          'w-full bg-secondary-800 border rounded-xl px-4 text-white-100 text-[16px] transition-all outline-none',
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

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
}

export default InputField
