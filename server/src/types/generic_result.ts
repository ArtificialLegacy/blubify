/**
 * A generic result enum for returning the status of a request to the client. Used in place of having identical enums for each endpoint.
 */
enum GenericResult {
  Success = 'S000',
  Failed = 'S100',
  InvalidRequest = 'S101',
}

export default GenericResult
