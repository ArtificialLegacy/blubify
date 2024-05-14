import { APIResult } from '../../types/api_result'

type SignupResult = APIResult | 'failed_db_store' | 'invalid_email' | 'username_taken' | 'success_no_session'

type SignupStatus = {
    status: SignupResult
    session?: string
}

export type { SignupResult, SignupStatus }
