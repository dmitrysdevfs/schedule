import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/slots', () => {
    return HttpResponse.json([
      { id: '1', start: '2026-02-25T14:00:00Z', end: '2026-02-25T14:30:00Z' },
      { id: '2', start: '2026-02-25T14:30:00Z', end: '2026-02-25T15:00:00Z' },
    ])
  }),

  http.post('/api/book', async ({ request }) => {
    const data = await request.json()
    console.log('Booking received:', data)
    return HttpResponse.json({ success: true, message: 'Invite sent' }, { status: 201 })
  }),
]
