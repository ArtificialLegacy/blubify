/**
 * Attempts to cull any expired sessions for a user, this should be called when the user attempts to login
 * or attempts an action requiring a session id validation.
 * @param _userid - The userid to cull sessions for.
 *
 * @example
 *
 * cullSessions(0)
 */
async function cullSessions(_userid: number) {
  await globalThis.db
    .deleteFrom('browsersessions')
    .where('user_id', '=', _userid)
    .where('created_at', '<', new Date(new Date().getTime() - 86400000 * 7))
    .execute()
    .catch(() => {})
}

export default cullSessions
