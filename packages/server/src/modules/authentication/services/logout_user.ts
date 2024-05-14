/**
 * Deletes a session from the database.
 * @param _session - The session to delete.
 */
function logoutUser(session: string) {
  globalThis.db.query(
    /*sql*/ `
    delete from BrowserSessions
      where session_id = ?;
    `,
    [session]
  )
}

export default logoutUser
