/**
 * Enum for the return status of a session status check.
 * @index S000-S099 : Session is valid.
 * @index S100-S199 : Session is invalid.
 */
enum SessionStatus {
  Valid = 'S000',
  Invalid = 'S100',
}

export default SessionStatus
