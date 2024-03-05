/**
 * Creates a new session and connects it to a user
 * @param _req The express request to get the
 * @param _userId user id from the user model to connect the session to
 * @returns sessionID
 *
 * @example
 *
 * const sessionID: string = await createSession(0)
 *
 * createSession(0).then((result: string => {}))
 */
async function createSession(
  _userId: number,
  _ip: string,
  _agent: { platform: string; browser: string }
): Promise<string | undefined> {
  await globalThis.db
    .insertInto('browsersessions')
    .values({
      user_id: _userId,
      ip: _ip,
      device_string: `${_agent.platform} [${_agent.browser}]`,
    })
    .executeTakeFirst()
    .catch((_err) => {
      console.log(_err)
    })

  const { sessionID }: { sessionID: string | undefined } = await globalThis.db
    .selectFrom('browsersessions')
    .select('session_id as sessionID')
    .where('user_id', '=', _userId)
    .orderBy('browsersessions.created_at', 'desc')
    .executeTakeFirst()
    .then((_value) => {
      return _value === undefined ? { sessionID: undefined } : _value
    })
    .catch((_err) => {
      return { sessionID: undefined }
    })

  return sessionID
}

export default createSession
