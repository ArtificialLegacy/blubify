import React, { useCallback } from 'react'

import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material'
import { LibraryMusic, ManageAccounts } from '@mui/icons-material'

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

  const handleAccountSettingsClick = useCallback(() => {
    _props.setAccountSettingsModalOpen(true)
  }, [_props])

  return (
    <div>
      <AppBar
        position='fixed'
        className={_props.drawerOpen ? 'main-bar-open' : 'main-bar'}
        sx={{ boxShadow: '0 0 0 black' }}
      >
        <Toolbar>
          <Tooltip
            title={
              _props.drawerOpen
                ? 'Close playlist drawer.'
                : 'Open playlist drawer.'
            }
            placement='right'
          >
            <IconButton
              style={{ marginRight: '15px' }}
              onClick={handleDrawerClick}
            >
              <LibraryMusic fontSize='large' />
            </IconButton>
          </Tooltip>
          <Typography sx={{ flexGrow: 1 }} variant='h5'>
            Blubify
          </Typography>
          <Tooltip title='Account Settings' placement='left'>
            <IconButton onClick={handleAccountSettingsClick}>
              <ManageAccounts fontSize='large' />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Mainbar
