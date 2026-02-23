import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = ({
  children,
  variant = 'primary',
  size = 'md', // 'md' is Small (42px), 'lg' is Big (60px)
  className,
  isDisabled = false,
  isLoading = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed rounded-full px-8'

  const variants = {
    primary:
      'bg-primary-200 text-secondary-100 hover:bg-primary-300 active:bg-primary-400 enabled:active:shadow-button-pressed disabled:bg-grey-300 disabled:text-grey-500',
    secondary:
      'bg-secondary-50 border-2 border-primary-200 text-primary-200 hover:border-primary-300 hover:text-primary-300 hover:bg-secondary-50 active:border-primary-400 active:text-primary-400 active:bg-secondary-50 disabled:border-grey-300 disabled:text-grey-300 disabled:bg-secondary-50',
  }

  const sizes = {
    sm: 'h-[36px] text-sm',
    md: 'h-[42px] text-base min-w-[115px]', // Small
    lg: 'h-[60px] text-lg min-w-[244px]', // Big
  }

  return (
    <button
      disabled={isDisabled || isLoading}
      className={twMerge(
        clsx(baseStyles, variants[variant], sizes[size], className),
      )}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  )
}

export default Button
