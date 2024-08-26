import React, { useEffect, useMemo } from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DefaultPage from 'pages/Default'
import SignupPage from 'pages/Signup'
import LoginPage from 'pages/Login'
import PlayerPage from 'pages/Player'
import UnknownPage from 'pages/Unknown'

import useTheme from 'hooks/use_theme'

import './styles/scrollbar.scss'
import './styles/styles.scss'

function App() {
  useEffect(() => {
    document.title = 'Blubify'
  }, [])

  const themeString = useTheme()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeString,
          contrastThreshold: 4.5,
        },
      }),
    [themeString]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <img
        src={themeString === 'dark' ? 'dark.jpg' : 'light.jpg'}
        style={{ position: 'absolute', width: '100vw', height: '100vh' }}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<DefaultPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='player' element={<PlayerPage />} />
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
