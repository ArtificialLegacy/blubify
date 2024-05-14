/**
 * Equation for the volume curve of the volume slider.
 * Used to adjust the volume slider from linear to an exponential curve.
 * This is to allow a more natural feel to the volume slider.
 *
 * @param _value The value of the volume slider between 0 and 1.
 * @returns The adjusted value using a more accurate volume curve.
 *
 * @example
 *
 * const volume = volumeCurve(slider.value)
 */
function volumeCurve(_value: number) {
  return Math.floor(_value ** 3 * 100) / 100
}

export default volumeCurve
