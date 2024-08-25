import * as yup from 'yup'

import type { LoginData } from 'types'

/**
 * Validation schema for the login form
 */
const loginValidationSchema = yup.object({
    username: yup.string().required('Username is required'),

    password: yup.string().required('Password is required'),
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
    return await loginValidationSchema
        .isValid(_data)
        .then((_value) => _value)
        .catch(() => false)
}

export { loginValidationSchema, validateLoginData }
