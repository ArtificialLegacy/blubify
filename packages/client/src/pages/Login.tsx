import React from 'react'

import { Box } from '@mui/material'

import { LoginForm } from 'features/login'

function LoginPage() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <LoginForm />
    </Box>
  )
}

export default LoginPage
