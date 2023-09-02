/**
 * Basic async sleep function.
 * @param _ms - Amount of ms to sleep for
 * @returns - Promise to await or .then
 *
 * @example
 *
 * await sleep(1000)
 *
 * sleep(1000).then(() => {})
 *
 */
function sleep(_ms: number): Promise<void> {
  return new Promise((_resolve) => setTimeout(_resolve, _ms))
}

export default sleep
