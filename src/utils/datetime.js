/**
 * Derives a human-readable timezone label from an IANA timezone string.
 * e.g. "Europe/Kiev" → "Eastern European Standard Time"
 *
 * @param {string} tz - IANA timezone identifier
 * @returns {string} Human-readable timezone label
 */
export function getTimezoneLabel(tz) {
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
