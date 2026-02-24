export const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

export const SUPPORTED_TIMEZONES = [
  { id: localTz, label: `Local Time (${localTz})` },
  { id: 'Europe/Berlin', label: 'Central European Time (CET)' },
  { id: 'UTC', label: 'UTC (Universal Coordinated Time)' },
]

export const getTimezoneLabel = (tz) => {
  const labels = {
    'Europe/Berlin': 'Central European Time',
    CET: 'Central European Time',
    UTC: 'Universal Coordinated Time',
  }
  return labels[tz] || tz
}
