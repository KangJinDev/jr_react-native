interface ICVAuthRequest {
  messageType: number
  locationNumber: number
  dateTimeStampUTC: string
  PIN: number
}

declare enum AccessLevel {
  NOT_AUTHENTICATED = 0,
  STORE_MANAGER = 2,
  CORPORATE_ACCESS = 4
}

interface ICVAuthResponse {
  messageType: number
  locationNumber: number
  dateTimeStampUTC: string
  errorCode: number
  errorDescription: string
  accessLevel: AccessLevel
}

interface IAuthRequest {
  PIN: number
}

interface IAuthResponse {
  accessLevel: number
}

export type CVAuthRequest = ICVAuthRequest
export type CVAuthResponse = ICVAuthResponse & ICVAuthRequest
export type AuthRequest = IAuthRequest
export type AuthResponse = IAuthResponse & IAuthRequest
