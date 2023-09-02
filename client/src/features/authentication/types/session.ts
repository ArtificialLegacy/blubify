/**
 * Type for session information returned by the server.
 *
 * @property sessionId - The unique identifier for the session.
 * @property createdAt - The date and time the session was created.
 * @property ip - The IP address of the client the session was created from.
 * @property deviceString - Device information about the device the session was created from.
 */
type Session = {
  sessionId: string
  createdAt: string
  ip: string
  deviceString: string
}

export type { Session }
