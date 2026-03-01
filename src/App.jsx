import { useMemo } from 'react'
import DatePicker from './components/organisms/DatePicker'
import SlotPanel from './components/molecules/SlotPanel'
import { useBookingStore } from './store/useBookingStore'
import { clsx } from 'clsx'
import BookingHeader from './components/molecules/BookingHeader'
import BookingForm from './components/organisms/BookingForm'
import { getMonthRowCount } from './utils/calendar'
import { parseISO } from 'date-fns'
import { LAYOUT_CONFIG } from './constants/layout'

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
    step,
    setStep,
  } = useBookingStore()

  // Memoize dates once to avoid redundant parsing in children
  const viewDate = useMemo(() => parseISO(viewDateIso), [viewDateIso])
  const selectedDateObj = useMemo(
    () => (selectedDate ? parseISO(selectedDate) : null),
    [selectedDate],
  )

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
    setStep('form')
  }

  const handleBack = () => {
    setStep('selection')
  }

  const handleConfirm = (data) => {
    // TODO: Implement booking submission API call in Stage 6
    console.log('Booking confirmed', {
      selectedDate,
      slot: draft.slotId,
      ...data,
    })
  }

  return (
    <div className="min-h-screen bg-secondary text-white-100 flex flex-col items-center justify-center p-12">
      <div className="w-full max-w-4xl">
        {/* Booking Experience Section - High Fidelity */}
        <section className="space-y-8 flex flex-col items-center">
          <div
            className={clsx(
              'bg-secondary-800 rounded-3xl border border-white-25 shadow-2xl overflow-hidden relative flex flex-col items-center justify-start pt-8 transition-all duration-700 ease-in-out',
              step === 'form' ? 'pb-[66px]' : 'pb-[18px]',
            )}
            style={{
              width: `${LAYOUT_CONFIG.BOX_WIDTH}rem`,
              height:
                step === 'form'
                  ? 'unset'
                  : `${LAYOUT_CONFIG.getBoxHeight(calendarRows)}rem`,
            }}
          >
            {/* Persistent Header - Full Width Divider */}
            <div className="w-full">
              <BookingHeader
                step={step}
                date={selectedDateObj}
                slot={draft.slotId}
                timezone={timezone}
              />
            </div>

            {/* Animation Wrapper for Calendar and Slots */}
            <div
              className="flex items-start transition-all duration-700 ease-in-out"
              style={{
                width: `${LAYOUT_CONFIG.WRAPPER_WIDTH}rem`,
                transform:
                  step === 'form'
                    ? `translateX(-${LAYOUT_CONFIG.WRAPPER_WIDTH + (LAYOUT_CONFIG.BOX_WIDTH - LAYOUT_CONFIG.WRAPPER_WIDTH) / 2}rem)`
                    : selectedDate
                      ? 'none'
                      : `translateX(${LAYOUT_CONFIG.CENTER_X_OFFSET}rem)`,
              }}
            >
              {/* Calendar Block (344 x dynamic) */}
              <div
                className="flex-shrink-0 flex flex-col"
                style={{
                  width: `${LAYOUT_CONFIG.CALENDAR_WIDTH}rem`,
                  ...(step === 'form' ? { height: 0, overflow: 'hidden' } : {}),
                }}
              >
                <DatePicker
                  selectedDateObj={selectedDateObj}
                  setSelectedDate={handleDateSelect}
                  viewDate={viewDate}
                  setViewDate={setViewDate}
                  timezone={timezone}
                  setTimezone={setTimezone}
                  rowCount={calendarRows}
                  className="w-[22.25rem] pt-[1.75rem]"
                />
              </div>

              {/* Vertical Divider */}
              <div
                className={clsx(
                  'w-[1px] bg-white-25 flex-shrink-0 mx-[0.5rem] mt-[1.75rem] transition-all duration-700 ease-in-out',
                  selectedDate && step !== 'form'
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none',
                )}
                style={
                  step === 'form'
                    ? {}
                    : {
                        height: `${LAYOUT_CONFIG.getContentHeight(calendarRows) - 1.75}rem`,
                      }
                }
              />

              {/* Slot Panel Column (Synchronized Height) */}
              <div
                className={clsx(
                  'flex-shrink-0 w-[16.25rem] overflow-hidden transition-opacity duration-700 ease-in-out',
                  selectedDate && step !== 'form'
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none',
                )}
                style={{
                  height:
                    step === 'form'
                      ? 0
                      : `${LAYOUT_CONFIG.getContentHeight(calendarRows)}rem`,
                }}
              >
                <SlotPanel
                  selectedDate={selectedDateObj}
                  selectedSlot={draft.slotId}
                  onSlotSelect={handleSlotSelect}
                  onNext={handleNext}
                  className="w-[16.25rem] pt-[1.75rem]"
                />
              </div>

              {/* Booking Form View (Sliding from Right) */}
              <div
                className={clsx(
                  'flex-shrink-0 w-[43.75rem] transition-all duration-700 ease-in-out px-8 pt-[1.75rem]',
                  step === 'form'
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none',
                )}
              >
                {selectedDateObj && draft.slotId && (
                  <div className="flex flex-col items-center w-full">
                    <BookingForm onBack={handleBack} onSubmit={handleConfirm} />
                  </div>
                )}
              </div>
            </div>

            {/* Cookie Settings (Moving Footer) - Fixed 24px from bottom edge */}
            <div
              className={clsx(
                'absolute bottom-[24px] transition-[left,transform] duration-700 ease-in-out z-20 -translate-x-1/2',
                (step === 'form' || !selectedDate) && 'left-1/2',
              )}
              style={
                selectedDate && step !== 'form'
                  ? { left: `${LAYOUT_CONFIG.COOKIE_SETTINGS_LEFT}rem` }
                  : {}
              }
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
