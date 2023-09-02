import { Users } from 'kysely-codegen'
import { Selectable } from 'kysely'

import LoginStatus from './login_status'

/**
 * Object type returned by attempting to retrieve the user from the db and verifying password.
 */
type LoginResultSuccess = {
  readonly status: LoginStatus.Success
  readonly user: Selectable<Users>
}

/**
 * Mixin of LoginResultSuccess and a struct with only LoginStatus for failures and other errors.
 */
type LoginResult = LoginResultSuccess | { readonly status: LoginStatus }

export type { LoginResultSuccess, LoginResult }
