import type { SessionStatus } from 'types'
import { db_col } from 'utility/db_unwrap'

/**
 * Validates if a session id is still valid in the database.
 * @param sessionID A string containing a session id to check for.
 * @returns {LoginResult} `LoginStatus.Success` if session exists, else `LoginStatus.Failed`.
 *
 * @example
 *
 * const valid = await checkSession('uuidStringHere')
 *
 * checkSession('uuidStringHere').then(result: LoginResult => {}))
 */
async function checkSession(sessionID: string): Promise<SessionStatus> {
  const result = await globalThis.db
    .query(
      /*sql*/ `
      select session_id
        from BrowserSessions
        where session_id = ?;
      `,
      [sessionID]
    )
    .then(db_col<string>('session_id'))
    .catch(() => null)

  if (result == null || result === undefined) return 'invalid'
  else return 'valid'
}

export default checkSession
