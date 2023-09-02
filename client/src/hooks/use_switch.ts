import { useCallback, useState } from 'react'

function useSwitch(_initState = false): [boolean, () => void, () => void] {
  const [state, setState] = useState(_initState)
  const open = useCallback(() => setState(true), [])
  const close = useCallback(() => setState(false), [])

  return [state, open, close]
}

export default useSwitch
