export const LAYOUT_CONFIG = {
  // Container & Core Dimensions
  BOX_WIDTH: 43.75, // 700px
  ROW_HEIGHT: 3.25, // 52px
  BOX_BASE_HEIGHT: 29.375, // BOX_BASE_HEIGHT stays original; getContentHeight +3rem closes the cookie gap
  WRAPPER_WIDTH: 39.5625, // CALENDAR_WIDTH + DIVIDER + SLOTS = 22.25 + 1.0625 + 16.25 = 39.5625
  CALENDAR_WIDTH: 22.25, // 356px (7*44px grid + gaps)

  // Field Dimensions (Single Source of Truth)
  FIELD_WIDTH: 21.875, // 350px
  INPUT_HEIGHT: 2.5, // 40px
  TEXTAREA_HEIGHT: 5.0, // 80px

  get CENTER_X_OFFSET() {
    return (this.WRAPPER_WIDTH - this.CALENDAR_WIDTH) / 2
  },

  DIVIDER_WIDTH: 1.0625, // 17px total (0.5rem margins + 1px border)

  get COOKIE_SETTINGS_LEFT() {
    const contentStart = (this.BOX_WIDTH - this.WRAPPER_WIDTH) / 2
    return contentStart + this.CALENDAR_WIDTH / 2
  },

  TRANSITION_DURATION: 700,

  getContentHeight(rows) {
    return rows * this.ROW_HEIGHT + 16.0
  },

  getBoxHeight(rows) {
    return this.BOX_BASE_HEIGHT + rows * this.ROW_HEIGHT
  },
}
