import type { SignupData, SignupResult } from 'types'

/**
 * Creates a new user entry in the db
 * @param data - The data to be stored in the db
 * @returns - Success if the user was stored, else will return FailedDBStore
 */
async function accountCreate(data: SignupData): Promise<SignupResult> {
  return await globalThis.db
    .query(
      /*sql*/ `
      insert into Users (username, pass)
        values (?, ?);
      `,
      [data.username, data.password]
    )
    .then(() => 'success' as SignupResult)
    .catch(() => 'failed_db_store' as SignupResult)
}

export default accountCreate
