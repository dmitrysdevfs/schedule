import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookingStore = create()(
  persist(
    (set) => ({
      draft: {
        slotId: null,
        name: '',
        email: '',
        guests: '',
        comment: '',
      },
      selectedDate: null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      setDraft: (field, value) =>
        set((state) => ({
          draft: { ...state.draft, [field]: value },
        })),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setTimezone: (tz) => set({ timezone: tz }),
      resetDraft: () =>
        set({
          draft: { slotId: null, name: '', email: '', guests: '', comment: '' },
          selectedDate: null,
        }),
    }),
    {
      name: 'booking-storage',
    },
  ),
)
