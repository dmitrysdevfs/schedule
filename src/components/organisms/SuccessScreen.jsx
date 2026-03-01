import PropTypes from 'prop-types'
import { Calendar, Globe, User, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { LAYOUT_CONFIG } from '../../constants/layout'

const EVENT_TITLE = 'Schedule eClosing'

// Derive a human-readable timezone label (e.g. "Eastern European Standard Time")
function getTimezoneLabel(tz) {
  try {
    return (
      Intl.DateTimeFormat('en', { timeZoneName: 'long', timeZone: tz })
        .formatToParts(new Date())
        .find((p) => p.type === 'timeZoneName')?.value ?? tz.replace(/_/g, ' ')
    )
  } catch {
    return tz.replace(/_/g, ' ')
  }
}

const SuccessScreen = ({ date, slot, timezone, name, onBookAnother }) => {
  let timeRange = ''
  let fullDate = ''

  if (date && slot) {
    const [hours, minutes] = slot.split(':')
    const startDate = new Date(date)
    startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10))
    const endDate = new Date(startDate.getTime() + 30 * 60000)
    timeRange = `${slot} - ${format(endDate, 'HH:mm')}`
    fullDate = format(date, 'EEEE, MMMM d, yyyy')
  }

  const tzLabel = getTimezoneLabel(timezone)

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div
        className="flex flex-col items-center gap-6"
        style={{ width: `${LAYOUT_CONFIG.SUCCESS_CONTENT_WIDTH}rem` }}
      >
        {/* Headline row — icon + text inline */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={28} className="text-primary flex-shrink-0" />
            <h3 className="text-[26px] leading-[34px] font-bold text-white-100">
              You are scheduled
            </h3>
          </div>
          <p className="text-[15px] leading-[22px] text-white-50">
            A calendar invitation has been sent to your email address.
          </p>
        </div>

        {/* Details card */}
        <div className="w-full rounded-2xl border border-white-10 bg-secondary-700 px-7 py-6 flex flex-col gap-4">
          {/* Card title — same visual weight as the heading */}
          <p className="text-[26px] leading-[34px] font-bold text-white-100">
            {EVENT_TITLE}
          </p>

          {/* Name row */}
          {name && (
            <div className="flex items-center gap-3 text-white-75">
              <User size={18} className="text-white-50 flex-shrink-0" />
              <span className="text-[15px] leading-[22px] text-white-50">
                {name}
              </span>
            </div>
          )}

          {/* Date & time row */}
          {timeRange && (
            <div className="flex items-center gap-3 text-white-75">
              <Calendar size={18} className="text-white-50 flex-shrink-0" />
              <span className="text-[15px] leading-[22px] text-white-50">
                {timeRange}, <span>{fullDate}</span>
              </span>
            </div>
          )}

          {/* Timezone row */}
          {timezone && (
            <div className="flex items-center gap-3 text-white-75">
              <Globe size={18} className="text-white-50 flex-shrink-0" />
              <span className="text-[15px] leading-[22px] text-white-50">
                {tzLabel}
              </span>
            </div>
          )}
        </div>

        {/* Book another */}
        <button
          onClick={onBookAnother}
          className="text-primary-200 text-[14px] leading-[18px] font-medium hover:underline mt-1"
        >
          Book another slot
        </button>
      </div>
    </div>
  )
}

SuccessScreen.propTypes = {
  date: PropTypes.instanceOf(Date),
  slot: PropTypes.string,
  timezone: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBookAnother: PropTypes.func.isRequired,
}

export default SuccessScreen
