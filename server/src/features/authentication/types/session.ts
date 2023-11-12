/**
 * Type for the session data returned from the database.
 * @property sessionId - The session ID.
 * @property createdAt - The date the session was created.
 * @property ip - The IP address of the device the session was created for.
 * @property deviceString - The device string of the device the session was created for.
 */
type Session = {
  sessionId: string
  createdAt: Date
  ip: string
  deviceString: string
}

export type { Session }
