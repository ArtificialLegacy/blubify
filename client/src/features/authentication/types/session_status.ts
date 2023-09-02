/**
 * Status enum sent back to the client for the validity of a session token.
 */
enum SessionStatus {
  Valid = 'S000',
  Invalid = 'S100',
}

export default SessionStatus
