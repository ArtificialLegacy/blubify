import { LoginStatus } from 'features/login'
import { SignupStatus } from 'features/signup'

/**
 * Result returned by the api for login or signup including a sessionID to store in a cookie.
 */
type AuthResult = {
  status: SignupStatus | LoginStatus
  session: string
}

export type { AuthResult }
