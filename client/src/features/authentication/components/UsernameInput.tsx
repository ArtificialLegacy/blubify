import React from 'react'

import { InputAdornment, TextField, ListItem } from '@mui/material'
import { Person } from '@mui/icons-material'

interface UsernameInputProps {
  readonly name: string
  readonly value: string
  readonly handleChange: (e: React.ChangeEvent) => void
  readonly handleBlur: (e: React.FocusEvent) => void
  readonly error: boolean
  readonly helperText: string
}

/**
 * @prop name - The formik name prop.
 * @prop value - The formik value prop.
 * @prop handleChange - The formik handleChange prop.
 * @prop handleBlur - The formik handleBlur prop.
 * @prop error - The formik error prop.
 * @prop helperText - The formik helper text prop.
 */
function UsernameInput(_props: UsernameInputProps) {
  return (
    <ListItem>
      <TextField
        required
        fullWidth={true}
        label='Username'
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
            <InputAdornment position='end'>
              <Person />
            </InputAdornment>
          ),
        }}
      />
    </ListItem>
  )
}

export default UsernameInput
