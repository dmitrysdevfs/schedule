export const LAYOUT_CONFIG = {
  BOX_WIDTH: 43.75, // 700px
  ROW_HEIGHT: 3.25,
  BOX_BASE_HEIGHT: 20.375,
  WRAPPER_WIDTH: 39.5625, // 22.25 + 1.0625 + 16.25 = 39.5625
  CALENDAR_WIDTH: 22.25, // 356px (7*44 + 6*8)
  get CENTER_X_OFFSET() {
    return (this.WRAPPER_WIDTH - this.CALENDAR_WIDTH) / 2
  },
  DIVIDER_MARGIN: 0.5, // 8px
  COOKIE_SETTINGS_LEFT: 13.59375, // (BOX_WIDTH - WRAPPER_WIDTH) / 2 + CALENDAR_WIDTH / 2 = 2.09375 + 11.125 = 13.21875? Wait.
  TRANSITION_DURATION: 700,
  getContentHeight(rows) {
    return rows * this.ROW_HEIGHT + 13.0 // 8px (above header) + 44px (header) + 24px (gap) + 16px (labels) + 16px (gap) + 8px (below grid) + 24px (gap) + 14px (tz title) + 6px (gap) + 20px (tz selector)?
    // In pixels: 13.5rem * 16 = 216px. Let's re-verify the content height mapping.
    // rows=6 (19rem) -> total content = 32.5rem?
    // Let's use simpler mapping or fixed offset since the internal layout is mostly fixed except the grid.
  },
  getBoxHeight(rows) {
    return this.BOX_BASE_HEIGHT + rows * this.ROW_HEIGHT
  },
}
