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
      setDraft: (field, value) =>
        set((state) => ({
          draft: { ...state.draft, [field]: value },
        })),
      resetDraft: () =>
        set({
          draft: { slotId: null, name: '', email: '', guests: '', comment: '' },
        }),
    }),
    {
      name: 'booking-storage',
    },
  ),
)
