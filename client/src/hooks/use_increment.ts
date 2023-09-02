import { useCallback, useState } from 'react'

function useIncrement(_initState = 0): [number, () => void] {
  const [state, setState] = useState(_initState)
  const increment = useCallback(() => setState(state + 1), [state])

  return [state, increment]
}

export default useIncrement
