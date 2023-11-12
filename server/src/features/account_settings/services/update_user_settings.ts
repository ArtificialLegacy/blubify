/**
 * Update user settings in the database.
 * @param _userId - The user id of the user to update.
 * @param _theme - The theme value for the user to update to.
 * @returns - A promise that resolves to a boolean indicating if the update was successful.
 */
async function updateUserSettings(
  _userId: number,
  _theme: number
): Promise<boolean> {
  return globalThis.db
    .updateTable('users')
    .set({
      theme: _theme,
    })
    .where('user_id', '=', _userId)
    .execute()
    .then(() => true)
    .catch(() => false)
}

export default updateUserSettings
