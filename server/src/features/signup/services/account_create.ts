import { Insertable } from 'kysely'
import { Users } from 'kysely-codegen'

import SignupStatus from '../types/signup_status'

/**
 * Creates a new user entry in the db
 * @param _data - The data to be stored in the db
 * @returns - Success if the user was stored, else will return FailedDBStore
 */
async function accountCreate(_data: Insertable<Users>): Promise<SignupStatus> {
  return await globalThis.db
    .insertInto('users')
    .values(_data)
    .execute()
    .then(() => SignupStatus.Success)
    .catch(() => SignupStatus.FailedDBStore)
}

export default accountCreate
