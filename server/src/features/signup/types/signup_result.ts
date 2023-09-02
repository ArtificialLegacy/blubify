import { Users } from 'kysely-codegen'
import { Selectable } from 'kysely'

import SignupStatus from './signup_status'

/**
 * Object type returned by attempting to store the user in the db.
 */
type SignupResultSuccess = {
  readonly status: SignupStatus.Success
  readonly user: Selectable<Users>
}

/**
 * Mixin of SignupResultSuccess and a struct with only SignupStatus for failures and other errors.
 */
type SignupResult = SignupResultSuccess | { readonly status: SignupStatus }

export type { SignupResult, SignupResultSuccess }
