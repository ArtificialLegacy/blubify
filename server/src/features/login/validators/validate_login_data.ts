import * as yup from 'yup'

import type { LoginData } from '../types/login_data'

/**
 * Validation schema for the login api endpoint
 */
const loginDataValidationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})

/**
 * Validates user data submitted as login data
 * @param _data User data to validate
 * @returns Promise with a result boolean, true if valid, else false
 *
 * @example
 *
 * const valid: boolean = await validateLoginData(LoginData)
 *
 * validateLoginData(LoginData).then((valid: boolean) => {})
 */
async function validateLoginData(_data: LoginData): Promise<boolean> {
  return await loginDataValidationSchema
    .isValid(_data)
    .then((_value) => _value)
    .catch(() => false)
}

export default validateLoginData
