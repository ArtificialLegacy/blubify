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
  SessionStatus,
} from 'features/authentication'

import loginValidationSchema from '../validators/login_validator'
import type { LoginData } from '../types/login_data'
import LoginStatus from '../types/login_status'
import loginSubmit from '../services/login_submit'

function LoginForm() {
  const [status, setStatus] = useState(LoginStatus.Success)

  // Code that runs when form first loads.
  useEffect(() => {
    ;(async function () {
      if ((await checkSession()).status === SessionStatus.Valid)
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
      if (response.status === LoginStatus.Success) {
        window.location.pathname = '/player'
        sessionSetCookie(response.session)
      }

      setStatus(response.status as LoginStatus)
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
                status === LoginStatus.InvalidUserDetails
              }
              helperText={
                status === LoginStatus.InvalidUserDetails
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
            status === LoginStatus.InvalidRequest ||
            status === LoginStatus.Failed
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
