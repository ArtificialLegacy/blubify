import React from 'react'

import { Box } from '@mui/material'

import { SignupForm } from 'features/signup'

function SignupPage() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <SignupForm />
    </Box>
  )
}

export default SignupPage
