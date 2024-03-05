import * as yup from 'yup'

import type { SignupData } from 'types'

/**
 * Validation schema for the signup api endpoint
 */
const signupDataValidationSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .matches(/^[a-z ]+$/i),

    password: yup
      .string()
      .required()
      .min(8)
      .matches(/(?=.*?[A-Z])/)
      .matches(/(?=.*?[a-z])/)
      .matches(/(?=.*?[0-9])/)
      .matches(/(?=.*?[#?!@$%^&*-])/),
  })
  .strict()

/**
 * Validates user data submitted as signup data
 * @param _data User data to validate
 * @returns Promise with a result boolean, true if valid, else false
 *
 * @example
 *
 * const valid: boolean = await validateSignupData(SignupData)
 *
 * validateSignupData(SignupData).then((valid: boolean) => {})
 */
async function validateSignupData(_data: SignupData): Promise<boolean> {
  return await signupDataValidationSchema
    .isValid(_data)
    .then((_value) => _value)
    .catch(() => false)
}

export default validateSignupData
