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
