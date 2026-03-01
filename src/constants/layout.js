export const LAYOUT_CONFIG = {
  BOX_WIDTH: 43.75, // 700px
  ROW_HEIGHT: 3.25,
  BOX_BASE_HEIGHT: 20.375,
  WRAPPER_WIDTH: 39.5625, // CALENDAR_WIDTH + DIVIDER + SLOTS = 22.25 + 1.0625 + 16.25 = 39.5625
  CALENDAR_WIDTH: 22.25, // 356px (7*44px grid + gaps)
  get CENTER_X_OFFSET() {
    return (this.WRAPPER_WIDTH - this.CALENDAR_WIDTH) / 2
  },
  DIVIDER_WIDTH: 1.0625, // 17px total (0.5rem margins + 1px border)
  get COOKIE_SETTINGS_LEFT() {
    // Derived to stay relative to the active content block
    // (BOX_WIDTH - WRAPPER_WIDTH) / 2 gives the left margin of the centered block
    const contentStart = (this.BOX_WIDTH - this.WRAPPER_WIDTH) / 2
    return contentStart + this.CALENDAR_WIDTH / 2
  },
  TRANSITION_DURATION: 700,
  getContentHeight(rows) {
    // 13.0rem handles the fixed vertical stacking (header, labels, timezone, gaps)
    return rows * this.ROW_HEIGHT + 13.0
  },
  getBoxHeight(rows) {
    return this.BOX_BASE_HEIGHT + rows * this.ROW_HEIGHT
  },
}
