import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SlotButton from './SlotButton'

describe('SlotButton component', () => {
  it('renders time correctly', () => {
    render(<SlotButton time="09:00" />)
    expect(screen.getByText('09:00')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<SlotButton time="09:00" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('displays selected state correctly', () => {
    render(<SlotButton time="09:00" isSelected />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary-100')
  })

  it('is disabled when isDisabled prop is true', () => {
    render(<SlotButton time="09:00" isDisabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
