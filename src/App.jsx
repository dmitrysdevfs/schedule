import { useState } from 'react'
import Button from './components/atoms/Button'
import SlotButton from './components/atoms/SlotButton'
import CalendarDay from './components/atoms/CalendarDay'
import DatePicker from './components/organisms/DatePicker'
import { useBookingStore } from './store/useBookingStore'

function App() {
  const { selectedDate, setSelectedDate, timezone, setTimezone } =
    useBookingStore()
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [demoDay, setDemoDay] = useState(null)

  const handleSlotClick = (time) => {
    setSelectedSlot((prev) => (prev === time ? null : time))
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
        <section className="space-y-8">
          <h2 className="text-xl font-medium border-b border-secondary-800 pb-2">
            Buttons (Pill Shape)
          </h2>

          <div className="space-y-6">
            <h3 className="text-sm text-secondary-400 uppercase tracking-widest">
              Big (60px)
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg">Primary</Button>
              <Button size="lg" variant="secondary">
                Secondary
              </Button>
              <Button size="lg" isDisabled>
                Primary Disabled
              </Button>
              <Button size="lg" variant="secondary" isDisabled>
                Secondary Disabled
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm text-secondary-400 uppercase tracking-widest">
              Small (42px)
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" isDisabled>
                Primary Disabled
              </Button>
              <Button size="sm" variant="secondary" isDisabled>
                Secondary Disabled
              </Button>
            </div>
          </div>
        </section>

        {/* Time Slots Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-b border-white-25 pb-2">
            Time Slots
          </h2>
          <div className="flex gap-4">
            <SlotButton
              time="09:00"
              isSelected={selectedSlot === '09:00'}
              onClick={() => handleSlotClick('09:00')}
            />
            <SlotButton
              time="10:00"
              isSelected={selectedSlot === '10:00'}
              onClick={() => handleSlotClick('10:00')}
            />
            <SlotButton time="11:00" isDisabled />
          </div>
          <p className="text-xs text-secondary-50">
            Selected: {selectedSlot || 'None'}
          </p>
        </section>

        {/* Date Picker Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-b border-white-25 pb-2">
            Date Picker (Organism)
          </h2>
          <div className="flex justify-center md:justify-start">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              timezone={timezone}
              setTimezone={setTimezone}
            />
          </div>
        </section>

        {/* Calendar Section */}
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
      </div>
    </div>
  )
}

export default App
