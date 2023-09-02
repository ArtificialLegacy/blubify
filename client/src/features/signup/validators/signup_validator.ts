import * as yup from 'yup'

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
    .matches(
      /(?=.*?[#?!@$%^&*-])/,
      'Password must have at least 1 special character'
    ),

  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export default signupValidationSchema
