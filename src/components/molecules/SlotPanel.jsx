import PropTypes from 'prop-types'
import SlotButton from '../atoms/SlotButton'
import { generateTimeSlots } from '../../utils/calendar'
import Button from '../atoms/Button'
import { format, parseISO } from 'date-fns'
import { clsx } from 'clsx'

const TIME_SLOTS = generateTimeSlots()

const SlotPanel = ({ selectedDate, selectedSlot, onSlotSelect, onNext }) => {
  const slots = TIME_SLOTS

  // Format date for header: "Thursday, February 12"
  const dateHeader = selectedDate
    ? format(parseISO(selectedDate), 'eeee, MMMM d')
    : ''

  return (
    <div
      className={clsx(
        'w-[260px] h-full flex flex-col relative animate-in fade-in slide-in-from-right-8 duration-700 overflow-hidden',
      )}
    >
      <h5 className="text-base font-medium text-white-50 h-[24px] mb-[24px]">
        {dateHeader}
      </h5>

      {/* Container for slots list and shadow */}
      <div className="flex-1 relative overflow-hidden mb-[64px]">
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 gap-[8px] pb-12 w-[236px]">
            {slots.map((time) => (
              <SlotButton
                key={time}
                time={time}
                isSelected={selectedSlot === time}
                onClick={() => onSlotSelect(time)}
              />
            ))}
          </div>
        </div>

        {/* Fixed Shadow/Fade Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary-800 to-transparent pointer-events-none" />
      </div>

      {/* Sticky Next Button */}
      <div className="absolute bottom-0 left-[8px] right-[8px] z-10 flex justify-center pb-[4px]">
        <Button
          variant="primary"
          className={clsx('w-[244px] h-[56px] transition-all duration-300', {
            'bg-grey-300 text-grey-50 cursor-not-allowed opacity-50':
              !selectedSlot,
            'bg-primary-100 text-secondary border-none': selectedSlot,
          })}
          disabled={!selectedSlot}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

SlotPanel.propTypes = {
  selectedDate: PropTypes.string,
  selectedSlot: PropTypes.string,
  onSlotSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default SlotPanel
