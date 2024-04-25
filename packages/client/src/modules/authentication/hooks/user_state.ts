import { create } from 'zustand'

type UserState = {
  username: string
  createdAt: string
  theme: number

  setUsername: (_username: string) => void
  setCreatedAt: (_createdAt: string) => void
  setTheme: (_theme: number) => void
}

/**
 * Store hook for user information.
 *
 * @property username - Current user's username.
 * @property createdAt - Current user's account creation date.
 * @property theme - Current user's selected theme.
 *
 * @method setUsername - Sets the current user's username.
 * @method setCreatedAt - Sets the current user's account creation date.
 * @method setTheme - Sets the current user's selected theme.
 *
 * @example
 * const [username, createdAt, theme, setUsername, setCreatedAt, setTheme] = useUserStore((_state) => [username, createdAt, theme, setUsername, setCreatedAt, setTheme])
 */
const useUserState = create<UserState>((_set) => ({
  username: '',
  createdAt: '',
  theme: 0,

  /**
   * Sets the current user's username.
   * @param _username - The string to set the username to.
   *
   * @example
   * setUsername('username')
   */
  setUsername: (_username: string) => {
    _set(() => ({ username: _username }))
  },

  /**
   * Sets the current user's account creation date.
   * @param _createdAt - The string to set the account creation date to.
   *
   * @example
   * setCreatedAt('2021-01-01')
   */
  setCreatedAt: (_createdAt: string) => {
    _set(() => ({ createdAt: _createdAt }))
  },

  /**
   * Sets the current user's selected theme.
   * @param _theme - The number to set the selected theme to.
   *
   * @example
   * setTheme(1)
   */
  setTheme: (_theme: number) => {
    _set(() => ({ theme: _theme }))
  },
}))

export default useUserState
