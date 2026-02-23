import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CalendarDay from './CalendarDay'

describe('CalendarDay component', () => {
  it('renders day number correctly', () => {
    render(<CalendarDay day={15} />)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('hides day number for isOutsideMonth', () => {
    render(<CalendarDay day={31} isOutsideMonth />)
    expect(screen.queryByText('31')).not.toBeInTheDocument()
  })

  it('handles click events when enabled', () => {
    const handleClick = vi.fn()
    render(<CalendarDay day={15} onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when isDisabled is true', () => {
    render(<CalendarDay day={15} isDisabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows today indicator even when selected', () => {
    render(<CalendarDay day={2} isToday isSelected />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('after:bg-primary-400') // Specific color for dot when selected
    expect(button).toHaveClass('bg-primary-50') // Selected background
  })

  it('has accessible label for today', () => {
    render(<CalendarDay day={2} isToday />)
    expect(screen.getByLabelText(/today, day 2/i)).toBeInTheDocument()
  })
})
