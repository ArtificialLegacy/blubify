import SessionStatus from '../types/session_status'

/**
 * Validates if a session id is still valid in the database.
 * @param _sessionID A string containing a session id to check for.
 * @returns {LoginResult} `LoginStatus.Success` if session exists, else `LoginStatus.Failed`.
 *
 * @example
 *
 * const valid = await checkSession('uuidStringHere')
 *
 * checkSession('uuidStringHere').then(result: LoginResult => {}))
 */
async function checkSession(_sessionID: string): Promise<SessionStatus> {
  const result = await globalThis.db
    .selectFrom('browsersessions')
    .select('session_id')
    .where('session_id', '=', _sessionID)
    .executeTakeFirst()
    .catch((_error) => {
      return null
    })

  if (result == null || result === undefined) return SessionStatus.Invalid
  else return SessionStatus.Valid
}

export default checkSession
