import Const from './const'

const Env = {
  isMobile: () => window.innerWidth <= 960,

  APP_TYPE: process.env.REACT_APP_BC_APP_TYPE || 'frontend',
  API_HOST: process.env.REACT_APP_BC_API_HOST,
  LANGUAGES: ['fr', 'en'], // ISO 639-1 language codes
  DEFAULT_LANGUAGE: process.env.REACT_APP_BC_DEFAULT_LANGUAGE || 'en',
  PAGE_SIZE: Number.parseInt(process.env.REACT_APP_BC_PAGE_SIZE) || 30,
  CARS_PAGE_SIZE: Number.parseInt(process.env.REACT_APP_BC_CARS_PAGE_SIZE) || 15,
  BOOKINGS_PAGE_SIZE: Number.parseInt(process.env.REACT_APP_BC_BOOKINGS_PAGE_SIZE) || 20,
  BOOKINGS_MOBILE_PAGE_SIZE: Number.parseInt(process.env.REACT_APP_BC_BOOKINGS_MOBILE_PAGE_SIZE) || 10,
  CDN_USERS: process.env.REACT_APP_BC_CDN_USERS,
  CDN_CARS: process.env.REACT_APP_BC_CDN_CARS,
  PAGE_OFFSET: 200,
  CAR_PAGE_OFFSET: 400,
  COMPANY_IMAGE_WIDTH: Number.parseInt(process.env.REACT_APP_BC_COMAPANY_IMAGE_WIDTH) || 60,
  COMPANY_IMAGE_HEIGHT: Number.parseInt(process.env.REACT_APP_BC_COMAPANY_IMAGE_HEIGHT) || 30,
  CAR_IMAGE_WIDTH: Number.parseInt(process.env.REACT_APP_BC_CAR_IMAGE_WIDTH) || 300,
  CAR_IMAGE_HEIGHT: Number.parseInt(process.env.REACT_APP_BC_CAR_IMAGE_HEIGHT) || 200,
  CAR_OPTION_IMAGE_HEIGHT: 85,
  SELECTED_CAR_OPTION_IMAGE_HEIGHT: 30,
  RECAPTCHA_ENABLED: (process.env.REACT_APP_BC_RECAPTCHA_ENABLED && process.env.REACT_APP_BC_RECAPTCHA_ENABLED.toLowerCase()) === 'true',
  RECAPTCHA_SITE_KEY: process.env.REACT_APP_BC_RECAPTCHA_SITE_KEY,
  RECORD_TYPE: {
    ADMIN: 'admin',
    COMPANY: 'company',
    USER: 'user',
    CAR: 'car',
    LOCATION: 'location',
  },
  CAR_TYPE: {
    DIESEL: 'diesel',
    GASOLINE: 'gasoline',
  },
  GEARBOX_TYPE: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
  },
  FUEL_POLICY: {
    LIKE_FOR_LIKE: 'likeForlike',
    FREE_TANK: 'freeTank',
  },
  BOOKING_STATUS: {
    VOID: 'void',
    PENDING: 'pending',
    DEPOSIT: 'deposit',
    PAID: 'paid',
    RESERVED: 'reserved',
    CANCELLED: 'cancelled',
  },
  MINIMUM_AGE: Number.parseInt(process.env.REACT_APP_BC_MINIMUM_AGE) || 21,
  MILEAGE: {
    LIMITED: 'limited',
    UNLIMITED: 'unlimited',
  },
  // PAGINATION_MODE: CLASSIC or INFINITE_SCROLL
  // If you choose CLASSIC, you will get a classic pagination with next and previous buttons on desktop and infinite scroll on mobile.
  // If you choose INFINITE_SCROLL, you will get infinite scroll on desktop and mobile.
  // Defaults to CLASSIC
  PAGINATION_MODE:
    (process.env.REACT_APP_BC_PAGINATION_MODE && process.env.REACT_APP_BC_PAGINATION_MODE.toUpperCase()) === Const.PAGINATION_MODE.INFINITE_SCROLL
      ? Const.PAGINATION_MODE.INFINITE_SCROLL
      : Const.PAGINATION_MODE.CLASSIC,
}

export default Env