import * as yup from 'yup'

import type { SignupData } from 'types'

/**
 * Validation schema for the sign up form
 */
const signupValidationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .matches(/^[a-z ]+$/i, 'Username must only contain letters and spaces'),

    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/(?=.*?[A-Z])/, 'Password must have at least 1 uppercase letter')
        .matches(/(?=.*?[a-z])/, 'Password must have at least 1 lowercase letter')
        .matches(/(?=.*?[0-9])/, 'Password must have at least 1 digit')
        .matches(/(?=.*?[#?!@$%^&*-])/, 'Password must have at least 1 special character'),

    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
})

/**
 * Validation schema for the sign up api endpoint
 */
const signupDataValidationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .matches(/^[a-z ]+$/i, 'Username must only contain letters and spaces'),

    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/(?=.*?[A-Z])/, 'Password must have at least 1 uppercase letter')
        .matches(/(?=.*?[a-z])/, 'Password must have at least 1 lowercase letter')
        .matches(/(?=.*?[0-9])/, 'Password must have at least 1 digit')
        .matches(/(?=.*?[#?!@$%^&*-])/, 'Password must have at least 1 special character'),
})

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

export { signupValidationSchema, signupDataValidationSchema, validateSignupData }
