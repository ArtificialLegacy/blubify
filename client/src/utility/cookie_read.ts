/**
 * Reads the contents of a cookie.
 *
 * @param _name The name of the cookie to read
 * @returns {string} The contents of the cookie
 *
 * @example
 *
 * const sessionID: string = cookieRead('sessionID')
 */
function cookieRead(_name: string): string {
  return (
    document.cookie.match(`(^|;)\\s*${_name}\\s*=\\s*([^;]+)`)?.pop() || "" // magic
  );
}

export default cookieRead;
