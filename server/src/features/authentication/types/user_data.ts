/**
 * Type for the user data returned from the database.
 * @property username - The username of the user.
 * @property createdAt - The date the user was created.
 * @property theme - The UI theme the user has selected.
 */
type UserData = {
  username: string
  createdAt: Date
  theme: number
}

export default UserData
