/**
 * Type definition for results sent back from the API.
 */
type APIResult = 'success' | 'failed' | 'invalid_request'

type APIStatus = {
    status: APIResult
}

export type { APIResult, APIStatus }
