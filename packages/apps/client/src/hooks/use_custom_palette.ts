import useTheme from '@mui/material/styles/useTheme'
import { grey } from '@mui/material/colors'

/**
 * Object shape containing custom color strings.
 */
interface CustomPalette {
  'background-secondary': string
}

/**
 * Hook for getting the custom palette, is responsive to if the theme mode is dark/light
 * Is a hook instead of a function as useTheme is also a hook.
 * @returns {CustomPalette}
 *
 * @example
 *
 * const backgroundColor: string = useCustomPalette()['background-secondary']
 */
function useCustomPalette(): CustomPalette {
  const isDarkTheme = useTheme().palette.mode === 'dark'

  return {
    'background-secondary': isDarkTheme ? grey[900] : grey[200],
  }
}

export default useCustomPalette
export type { CustomPalette }
