/**
 * Deletes a session from the database.
 * @param _session - The session to delete.
 */
function logoutUser(_session: string) {
  globalThis.db
    .deleteFrom('browsersessions')
    .where('session_id', '=', _session)
    .execute()
}

export default logoutUser
