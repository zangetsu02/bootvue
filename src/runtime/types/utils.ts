export interface BaseSize {
  sm: unknown
  md: unknown
  lg: unknown
}

export type Size = keyof BaseSize

export interface BaseColorVariant {
  primary: unknown
  secondary: unknown
  success: unknown
  danger: unknown
  warning: unknown
  info: unknown
  light: unknown
  dark: unknown
}

export type ColorVariant = keyof BaseColorVariant

export interface BaseButtonVariant extends BaseColorVariant {
  'link': unknown
  'outline-primary': unknown
  'outline-secondary': unknown
  'outline-success': unknown
  'outline-danger': unknown
  'outline-warning': unknown
  'outline-info': unknown
  'outline-light': unknown
  'outline-dark': unknown
}

export type ButtonVariant = keyof BaseButtonVariant
