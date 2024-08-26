import React, { useCallback } from 'react'

import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material'
import { LibraryMusic, ManageAccounts } from '@mui/icons-material'

import '../styles/mainbar.scss'
import useTheme from 'hooks/use_theme'

interface mainbarProps {
  readonly drawerOpen: boolean
  readonly handleDrawerState: () => void
  readonly setAccountSettingsModalOpen: (_value: boolean) => void
}

/**
 * @prop drawerOpen - If the playlist list drawer is open
 * @prop handleDrawerState - function to toggle the state of the drawer
 */
function Mainbar(_props: mainbarProps) {
  const handleDrawerClick = useCallback(() => {
    _props.handleDrawerState()
  }, [_props])

  const theme = useTheme()

  const handleAccountSettingsClick = useCallback(() => {
    _props.setAccountSettingsModalOpen(true)
  }, [_props])

  return (
    <AppBar
      position='fixed'
      className={`appbar ${theme === 'light' && 'paper-light'}`}
    >
      <Toolbar className='appbar-toolbar'>
        <Tooltip
          title={
            _props.drawerOpen
              ? 'Close playlist drawer.'
              : 'Open playlist drawer.'
          }
          placement='right'
        >
          <IconButton
            style={{ marginRight: '15px', padding: '5px' }}
            onClick={handleDrawerClick}
          >
            <LibraryMusic fontSize='large' />
          </IconButton>
        </Tooltip>
        <Typography
          sx={{
            flexGrow: 1,
            color: theme === 'light' ? 'black' : 'white',
          }}
          variant='h5'
        >
          Blubify
        </Typography>
        <Tooltip title='Account Settings' placement='left'>
          <IconButton
            onClick={handleAccountSettingsClick}
            style={{ padding: '5px' }}
          >
            <ManageAccounts fontSize='large' />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default Mainbar
