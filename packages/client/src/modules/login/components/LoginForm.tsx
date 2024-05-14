import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'

import {
  List,
  ListItem,
  Button,
  Typography,
  Stack,
  Paper,
  Box,
} from '@mui/material'
import { Person } from '@mui/icons-material'

import {
  UsernameInput,
  PasswordInput,
  checkSession,
  sessionSetCookie,
} from 'modules/authentication'
import type { LoginResult, LoginData } from 'types'

import { loginValidationSchema } from 'validators'
import loginSubmit from '../services/login_submit'

function LoginForm() {
  const [status, setStatus] = useState<LoginResult>('success')

  // Code that runs when form first loads.
  useEffect(() => {
    ;(async function () {
      if ((await checkSession()).status === 'valid')
        window.location.pathname = '/player'
    })()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (_values) => {
      const { username, password } = _values
      const data: LoginData = {
        username,
        password,
      }

      const response = await loginSubmit(data)
      if (response.status === 'success') {
        window.location.pathname = '/player'
        sessionSetCookie(response.session as string)
      }

      setStatus(response.status as LoginResult)
    },
    validationSchema: loginValidationSchema,
  })

  return (
    <Box>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <List
            sx={{
              width: '400px',
            }}
          >
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <Person fontSize='large' />
                <Typography variant='h4'>Login</Typography>
              </Stack>
            </ListItem>

            <UsernameInput
              name='username'
              value={formik.values.username}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                ((formik.touched.username as boolean) &&
                  Boolean(formik.errors.username)) ||
                status === 'invalid_user_details'
              }
              helperText={
                status === 'invalid_user_details'
                  ? 'Invalid username or password.'
                  : ((formik.touched.username &&
                      formik.errors.username) as string)
              }
            />

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

            <ListItem
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant='text'
                color='secondary'
                onClick={() => (window.location.pathname = '/signup')}
              >
                Create Account instead
              </Button>
              <Button
                type='submit'
                variant='contained'
                disabled={!formik.isValid || !formik.dirty}
              >
                Login
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
          visibility:
            status === 'invalid_request' || status === 'failed'
              ? 'visible'
              : 'hidden',
        }}
      >
        Something went wrong!
      </Typography>
    </Box>
  )
}

export default LoginForm
