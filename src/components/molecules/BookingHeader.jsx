import PropTypes from 'prop-types'
import { Clock, Camera, Calendar, Globe } from 'lucide-react'
import { format } from 'date-fns'

const BookingHeader = ({ step, date, slot, timezone }) => {
  const isFormStep = step === 'form'

  // Format the time range (e.g., 10:00 - 10:30)
  let timeRange = ''
  let fullDate = ''
  if (date && slot) {
    const [hours, minutes] = slot.split(':')
    const startDate = new Date(date)
    startDate.setHours(parseInt(hours), parseInt(minutes))
    const endDate = new Date(startDate.getTime() + 30 * 60000)
    timeRange = `${slot} - ${format(endDate, 'HH:mm')}`
    fullDate = format(date, 'EEEE, MMMM d, yyyy')
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 pb-8 border-b border-white-10">
      {/* Static Title - Capitalize Case, Semi Bold (600) */}
      <h2 className="text-[32px] leading-[40px] font-semibold text-white-100 tracking-tight">
        Consultation
      </h2>

      <div className="flex flex-col gap-3 w-fit">
        {/* Static Row: Always Visible (Centered content) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white-50 text-[16px] leading-[24px]">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-white-50" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-white-50" />
            <span>Web conferencing details provided upon confirmation.</span>
          </div>
        </div>

        {/* Dynamic Row: Visible ONLY in form step (Centered content block, single line) */}
        {isFormStep && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white-50 text-[16px] leading-[24px] animate-fade-in pt-3 mt-1">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-white-50" />
              <span className="whitespace-nowrap">
                {timeRange}, {fullDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-white-50" />
              <span className="whitespace-nowrap">
                {timezone.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

BookingHeader.propTypes = {
  step: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  slot: PropTypes.string,
  timezone: PropTypes.string.isRequired,
}

export default BookingHeader
