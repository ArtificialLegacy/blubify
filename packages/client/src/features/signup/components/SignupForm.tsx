import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import {
  List,
  ListItem,
  Divider,
  Button,
  Typography,
  Stack,
  Paper,
  Box,
} from '@mui/material'
import { PersonAdd } from '@mui/icons-material'

import useCustomPalette from 'hooks/use_custom_palette'

import {
  UsernameInput,
  PasswordInput,
  checkSession,
  sessionSetCookie,
} from 'features/authentication'

import signupValidationSchema from '../validators/signup_validator'
import signupSubmit from '../services/signup_submit'
import type { SignupData } from '../types/signup_data'
import type { SignupResult } from 'types'

function SignupForm() {
  const [status, setStatus] = useState<SignupResult>('success')

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (_values: SignupData) => {
      const { username, password, confirmPassword } = _values
      const data: SignupData = {
        username,
        password,
        confirmPassword,
      }

      const response = await signupSubmit(data)

      if (response.status === 'success') {
        window.location.pathname = '/player'
        sessionSetCookie(response.session as string)
      }
      if (response.status === 'success_no_session')
        window.location.pathname = '/login'

      setStatus(response.status as SignupResult)
    },
    validationSchema: signupValidationSchema,
  })

  // Code that runs when form first loads.
  useEffect(() => {
    ;(async function () {
      if ((await checkSession()).status === 'valid')
        window.location.pathname = '/'
    })()
  }, [])

  return (
    <Box>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <List
            sx={{
              width: '400px',
            }}
          >
            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <PersonAdd fontSize='large' />
                <Typography variant='h4'>Create Account</Typography>
              </Stack>
            </ListItem>

            <UsernameInput
              name='username'
              value={formik.values.username}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                (formik.touched.username as boolean) &&
                Boolean(formik.errors.username)
              }
              helperText={
                (formik.touched.username && formik.errors.username) as string
              }
            />

            <Divider variant='middle' sx={{ marginBottom: '25px' }} />

            <PasswordInput
              name='password'
              value={formik.values.password}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                (formik.touched.password as boolean) &&
                Boolean(formik.errors.password)
              }
              helperText={
                (formik.touched.password && formik.errors.password) as string
              }
            />
            <PasswordInput
              name='confirmPassword'
              value={formik.values.confirmPassword}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                (formik.touched.confirmPassword as boolean) &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                (formik.touched.confirmPassword &&
                  formik.errors.confirmPassword) as string
              }
              confirmation
            />

            <ListItem
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant='text'
                color='secondary'
                onClick={() => (window.location.pathname = '/login')}
              >
                Log-in instead
              </Button>
              <Button
                type='submit'
                variant='contained'
                disabled={!formik.isValid || !formik.dirty}
              >
                Submit
              </Button>
            </ListItem>
          </List>
        </form>
      </Paper>
      <Typography
        color='error.main'
        display='flex'
        justifyContent='center'
        style={{ paddingTop: '10px' }}
        sx={{
          visibility: status === 'invalid_request' ? 'visible' : 'hidden',
        }}
      >
        Something went wrong!
      </Typography>
    </Box>
  )
}

export default SignupForm
