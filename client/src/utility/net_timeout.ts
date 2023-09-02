/**
 * Allows for fetch requests to be timed out, defaults to 8000ms.
 *
 * @param _ms Amount of ms before signal is aborted.
 * @returns Tuple containing the abort signal and a clear function for the setTimeout
 *
 * @example
 *
 * const [signal, clear] = netTimeout()
 * const response = await fetch('/api/endpoint', {
 *   method: 'GET',
 *   headers: { 'Content-type': 'application/json' },
 *   signal, // pass the abort signal to the fetch request
 * })
 * clear() // clear the setTimeout if the fetch request finishes before it is aborted
 *
 */
function netTimeout(_ms = 8000): [AbortSignal, ClearFunction] {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), _ms)

  const clear = () => {
    clearTimeout(timeout)
  }

  return [controller.signal, clear]
}

type ClearFunction = () => void

export default netTimeout
export type { ClearFunction }
