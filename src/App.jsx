import { useState, useMemo } from 'react'
import DatePicker from './components/organisms/DatePicker'
import SlotPanel from './components/molecules/SlotPanel'
import CalendarDay from './components/atoms/CalendarDay'
import { useBookingStore } from './store/useBookingStore'
import { clsx } from 'clsx'
import { getMonthRowCount } from './utils/calendar'
import { parseISO } from 'date-fns'

const LAYOUT_CONFIG = {
  BOX_WIDTH: 43.75, // 700px
  ROW_HEIGHT: 3.25,
  BOX_BASE_HEIGHT: 20.375,
  WRAPPER_WIDTH: 38.8125, // 621px
  CALENDAR_WIDTH: 21.5, // 344px
  get CENTER_X_OFFSET() {
    return (this.WRAPPER_WIDTH - this.CALENDAR_WIDTH) / 2
  },
  DIVIDER_MARGIN: 0.5, // 8px
  COOKIE_SETTINGS_LEFT: 13.21875, // 211.5px
  TRANSITION_DURATION: 700,
  getContentHeight(rows) {
    return rows * this.ROW_HEIGHT - 0.5 + 13.5 // Adding space for header/footer inside content area
  },
  getBoxHeight(rows) {
    return this.BOX_BASE_HEIGHT + rows * this.ROW_HEIGHT
  },
}

function App() {
  const {
    selectedDate,
    setSelectedDate,
    viewDate: viewDateIso,
    setViewDate,
    timezone,
    setTimezone,
    draft,
    setDraft,
  } = useBookingStore()

  const [demoDay, setDemoDay] = useState(null)

  // Memoize viewDate once to avoid redundant parsing in children
  const viewDate = useMemo(() => parseISO(viewDateIso), [viewDateIso])

  // Calculate how many rows the current viewMonth needs (4, 5, or 6)
  const calendarRows = useMemo(() => getMonthRowCount(viewDate), [viewDate])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setDraft('slotId', null) // Reset slot when date changes
  }

  const handleSlotSelect = (slot) => {
    setDraft('slotId', draft.slotId === slot ? null : slot)
  }

  const handleNext = () => {
    // TODO: Implement booking submission API call in Stage 6
    console.log('Booking confirmed', { selectedDate, slot: draft.slotId })
  }

  return (
    <div className="min-h-screen bg-secondary text-white-100 flex flex-col items-center justify-start p-12">
      <h1 className="text-4xl font-bold mb-12">Emdula UI Kit</h1>

      <div className="w-full max-w-4xl space-y-16">
        {/* Colors Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-b border-white-25 pb-2">
            Refined Palette
          </h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="h-12 bg-primary-400 rounded-lg flex items-center justify-center text-xs text-white">
              400
            </div>
            <div className="h-12 bg-primary-300 rounded-lg flex items-center justify-center text-xs text-secondary">
              300
            </div>
            <div className="h-12 bg-primary-200 rounded-lg flex items-center justify-center text-xs text-secondary">
              200
            </div>
            <div className="h-12 bg-primary-100 rounded-lg flex items-center justify-center text-xs text-secondary">
              100
            </div>
            <div className="h-12 bg-primary-50 rounded-lg flex items-center justify-center text-xs text-secondary">
              50
            </div>
          </div>
        </section>

        {/* Calendar Atoms Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-b border-white-25 pb-2">
            Calendar Days (44x44)
          </h2>
          <div className="flex gap-4 p-6 bg-secondary-800 rounded-2xl inline-flex items-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-secondary-50 uppercase">
                Outside
              </span>
              <CalendarDay day="31" isOutsideMonth />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-secondary-50 uppercase">
                Disabled
              </span>
              <CalendarDay day="1" isDisabled />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-secondary-50 uppercase">
                Today
              </span>
              <CalendarDay day="2" isToday />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-secondary-50 uppercase">
                Active
              </span>
              <CalendarDay
                day="3"
                isActive={demoDay !== 3}
                isSelected={demoDay === 3}
                onClick={() => setDemoDay((prev) => (prev === 3 ? null : 3))}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-secondary-50 uppercase">
                Today + Sel
              </span>
              <CalendarDay
                day="2"
                isToday
                isActive={demoDay !== 22}
                isSelected={demoDay === 22}
                onClick={() => setDemoDay((prev) => (prev === 22 ? null : 22))}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-secondary-50 uppercase">
                Selected
              </span>
              <CalendarDay
                day="4"
                isActive={demoDay !== 4}
                isSelected={demoDay === 4}
                onClick={() => setDemoDay((prev) => (prev === 4 ? null : 4))}
              />
            </div>
          </div>
        </section>

        {/* Booking Experience Section - High Fidelity */}
        <section className="space-y-8 flex flex-col items-center">
          <div
            className="bg-secondary-800 rounded-3xl border border-white-25 shadow-2xl overflow-hidden relative flex flex-col items-center justify-start pt-14 pb-[66px] transition-all duration-700 ease-in-out"
            style={{
              width: `${LAYOUT_CONFIG.BOX_WIDTH}rem`,
              height: `${LAYOUT_CONFIG.getBoxHeight(calendarRows)}rem`,
            }}
          >
            {/* Animation Wrapper for Calendar and Slots */}
            <div
              className="flex items-start transition-all duration-700 ease-in-out"
              style={{
                width: `${LAYOUT_CONFIG.WRAPPER_WIDTH}rem`,
                transform: selectedDate
                  ? 'none'
                  : `translateX(${LAYOUT_CONFIG.CENTER_X_OFFSET}rem)`,
              }}
            >
              {/* Calendar Block (344 x dynamic) */}
              <div
                className="flex-shrink-0 flex flex-col"
                style={{ width: `${LAYOUT_CONFIG.CALENDAR_WIDTH}rem` }}
              >
                <DatePicker
                  selectedDate={selectedDate}
                  setSelectedDate={handleDateSelect}
                  viewDate={viewDate}
                  setViewDate={setViewDate}
                  timezone={timezone}
                  setTimezone={setTimezone}
                  rowCount={calendarRows}
                  className="w-[21.5rem]"
                />
              </div>

              {/* Vertical Divider (Conditional Visibility) */}
              <div
                className={clsx(
                  'w-[1px] bg-white-25 mx-[0.5rem] transition-all duration-700 ease-in-out',
                  {
                    'opacity-100': selectedDate,
                    'opacity-0 pointer-events-none': !selectedDate,
                  },
                )}
                style={{
                  height: `${LAYOUT_CONFIG.getContentHeight(calendarRows)}rem`,
                }}
              />

              {/* Slot Panel Column (Synchronized Height) */}
              <div
                className={clsx(
                  'flex-shrink-0 w-[16.25rem] transition-all duration-700 ease-in-out',
                  selectedDate
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none',
                )}
                style={{
                  height: `${LAYOUT_CONFIG.getContentHeight(calendarRows)}rem`,
                }}
              >
                <SlotPanel
                  selectedDate={selectedDate}
                  selectedSlot={draft.slotId}
                  onSlotSelect={handleSlotSelect}
                  onNext={handleNext}
                  className="w-[16.25rem]"
                />
              </div>
            </div>

            {/* Cookie Settings (Moving Footer) - Fixed 24px from bottom edge */}
            <div
              className="absolute bottom-[24px] transition-[left,transform] duration-700 ease-in-out z-20"
              style={{
                left: selectedDate
                  ? `${LAYOUT_CONFIG.COOKIE_SETTINGS_LEFT}rem`
                  : '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <button className="text-primary-200 text-[14px] leading-[18px] font-medium hover:underline">
                Cookie settings
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
