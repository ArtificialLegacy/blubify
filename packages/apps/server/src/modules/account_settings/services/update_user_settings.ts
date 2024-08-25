/**
 * Update user settings in the database.
 * @param userId - The user id of the user to update.
 * @param theme - The theme value for the user to update to.
 * @returns - A promise that resolves to a boolean indicating if the update was successful.
 */
async function updateUserSettings(
  userId: number,
  theme: number
): Promise<boolean> {
  return await globalThis.db
    .query(
      /*sql*/ `
      update Users
        set theme = ?
        where user_id = ?;
      `,
      [theme, userId]
    )
    .then(() => true)
    .catch(() => false)
}

export default updateUserSettings
