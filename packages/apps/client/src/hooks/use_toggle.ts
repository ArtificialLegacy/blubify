import { useCallback, useState } from 'react'

/**
 * Hook for toggling a boolean value.
 * When called with set the state to the not of the current state.
 * @param _initState The initial state of the boolean value.
 * @returns tuple containing a boolean state and a toggle function for the state.
 *
 * @example
 *
 * const [showPassword, togglePassword]: [boolean, () => void] = useToggle(false)
 *
 * console.log(showPassword) // false
 * togglePassword()
 * console.log(showPassword) // true
 */
function useToggle(_initState = false): [boolean, (_set?: boolean) => void] {
  const [state, setState] = useState(_initState)
  const toggle = useCallback(
    (_set?: boolean) => {
      if (_set === undefined) setState((state) => !state)
      else setState(_set)
    },
    [state]
  )

  return [state, toggle]
}

export default useToggle
