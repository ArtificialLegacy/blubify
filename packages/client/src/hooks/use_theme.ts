import useMediaQuery from '@mui/material/useMediaQuery'
import { PaletteMode } from '@mui/material'

import { useUserState } from 'modules/authentication'

function useTheme(): PaletteMode {
  const userTheme = useUserState((_state) => _state.theme)
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)')

  let themeString: PaletteMode = 'dark'
  switch (userTheme) {
    case 0:
      themeString = prefersDarkTheme ? 'dark' : 'light'
      break
    case 1:
      themeString = 'light'
      break
    case 2:
      themeString = 'dark'
      break
  }

  return themeString
}

export default useTheme
