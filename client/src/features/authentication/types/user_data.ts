/**
 * Type for current user data.
 *
 * @property username - The username of the current user.
 * @property createdAt - The date and time when the current user was created.
 * @property theme - The currently selected theme of the current user.
 */
type UserData = {
  username: string
  createdAt: string
  theme: number
}

export type { UserData }
