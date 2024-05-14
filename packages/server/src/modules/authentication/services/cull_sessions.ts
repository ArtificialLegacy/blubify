/**
 * Attempts to cull any expired sessions for a user, this should be called when the user attempts to login
 * or attempts an action requiring a session id validation.
 * @param _userid - The userid to cull sessions for.
 *
 * @example
 *
 * cullSessions(0)
 */
async function cullSessions(userid: number) {
  // 1 week ago
  const date = new Date(new Date().getTime() - 86400000 * 7)

  await globalThis.db.query(
    /*sql*/ `
    delete from BrowserSessions
      where user_id = ?
        and created_at < ?;
  `,
    [userid, date]
  )
}

export default cullSessions
