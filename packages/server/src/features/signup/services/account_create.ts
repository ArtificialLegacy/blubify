import { Insertable } from 'kysely'
import { Users } from 'kysely-codegen'

import type { SignupResult } from 'types'

/**
 * Creates a new user entry in the db
 * @param _data - The data to be stored in the db
 * @returns - Success if the user was stored, else will return FailedDBStore
 */
async function accountCreate(_data: Insertable<Users>): Promise<SignupResult> {
  return await globalThis.db
    .insertInto('users')
    .values(_data)
    .execute()
    .then(() => 'success' as SignupResult)
    .catch(() => 'failed_db_store' as SignupResult)
}

export default accountCreate
