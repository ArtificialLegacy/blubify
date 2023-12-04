/**
 * Enum for the return status of a login attempt.
 * @index S000-S099 : Login was successful.
 * @index S100-S199 : An error occured during the login attempt.
 * @index S200-S299 : The provided user data is invalid.
 */
enum LoginStatus {
  Success = 'S000',
  Failed = 'S100',
  InvalidRequest = 'S200',
  InvalidUserDetails = 'S201',
}

export default LoginStatus
