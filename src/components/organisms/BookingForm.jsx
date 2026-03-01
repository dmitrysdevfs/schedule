import PropTypes from 'prop-types'
import { useState } from 'react'
import { useBookingStore } from '../../store/useBookingStore'
import InputField from '../atoms/InputField'
import TextArea from '../atoms/TextArea'
import Button from '../atoms/Button'

const BookingForm = ({ onBack, onSubmit }) => {
  const { draft, setDraft } = useBookingStore()
  const [errors, setErrors] = useState({})
  const [showGuests, setShowGuests] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!draft.name.trim()) newErrors.name = 'Name is required'

    if (!draft.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      newErrors.email = 'Check your email address and try again'
    }

    if (draft.guests) {
      const guestEmails = draft.guests
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean)
      const invalidGuests = guestEmails.filter(
        (e) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
      )
      if (invalidGuests.length > 0) {
        newErrors.guests = `Invalid email(s): ${invalidGuests.join(', ')}`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleScheduleId = () => {
    if (validate()) {
      onSubmit(draft)
    }
  }

  return (
    <div className="w-full flex flex-col">
      {/* Centered container for form content */}
      <div className="w-fit mx-auto flex flex-col gap-7">
        <h3 className="text-[20px] leading-[28px] font-bold text-white-100">
          Enter details
        </h3>

        <div className="flex flex-col gap-6 items-start">
          <InputField
            label="Name"
            required
            value={draft.name}
            onChange={(val) => setDraft('name', val)}
            error={errors.name}
          />

          <InputField
            label="Email"
            type="email"
            required
            value={draft.email}
            onChange={(val) => setDraft('email', val)}
            error={errors.email}
          />

          {showGuests ? (
            <InputField
              label="Guest Email(s)"
              type="email"
              value={draft.guests}
              onChange={(val) => setDraft('guests', val)}
              placeholder="name@example.com, ..."
              error={errors.guests}
            />
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowGuests(true)}
            >
              Add Guests
            </Button>
          )}

          <TextArea
            label="Please share anything that will help prepare our meeting"
            value={draft.comment}
            onChange={(val) => setDraft('comment', val)}
            maxLength={500}
          />

          <div className="flex flex-row items-center gap-6 mt-1">
            <Button
              variant="primary"
              size="sm"
              onClick={handleScheduleId}
              className="px-[1.125rem]"
            >
              Schedule Event
            </Button>

            <button
              onClick={onBack}
              className="text-white-50 text-[14px] hover:text-white-100 underline transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

BookingForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default BookingForm
