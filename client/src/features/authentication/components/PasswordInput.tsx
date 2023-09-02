import React from 'react'

import {
  TextField,
  InputAdornment,
  IconButton,
  ListItem,
  Tooltip,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import useToggle from 'hooks/use_toggle'

/**
 * Type used to pass props into {PasswordInput}
 */
interface PasswordInputProps {
  readonly name: string
  readonly value: string
  readonly confirmation?: boolean
  readonly handleChange: (e: React.ChangeEvent) => void
  readonly handleBlur: (e: React.FocusEvent) => void
  readonly error: boolean
  readonly helperText: string
}

/**
 * @prop name - The formik name prop.
 * @prop value - The formik value prop.
 * @prop confirmation - If the password input is for confirming the password or the original password.
 * @prop handleChange - The formik handleChange prop.
 * @prop handleBlur - The formik handleBlur prop.
 * @prop error - The formik error prop.
 * @prop helperText - The formik helper text prop.
 */
function PasswordInput(_props: PasswordInputProps) {
  const [showPassword, stogglePassword] = useToggle()
  const togglePassword = (): void => stogglePassword()

  return (
    <ListItem>
      <TextField
        required
        fullWidth={true}
        label={_props.confirmation ? 'Confirm Password' : 'Password'}
        type={showPassword ? 'text' : 'password'}
        name={_props.name}
        id={_props.name}
        value={_props.value}
        onChange={_props.handleChange}
        onBlur={_props.handleBlur}
        error={_props.error}
        helperText={_props.helperText || '\u00a0'}
        InputLabelProps={{ shrink: _props.value !== '' }}
        InputProps={{
          endAdornment: (
            <Tooltip
              placement='left'
              title={showPassword ? 'Hide password.' : 'Show password.'}
            >
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={togglePassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </Tooltip>
          ),
        }}
      />
    </ListItem>
  )
}

export default PasswordInput
