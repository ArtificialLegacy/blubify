import { APIResult } from '../../types/api_result'
import { UserAuthData } from '../authentication/user_auth_data'

type LoginResult = APIResult | 'invalid_user_details'

type LoginStatus = {
    status: LoginResult
    session?: string
    user?: UserAuthData
}

export type { LoginResult, LoginStatus }
