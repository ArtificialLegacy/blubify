import React, { useMemo, useCallback } from 'react'

import {
  Box,
  List,
  ListItem,
  Typography,
  Stack,
  Divider,
  Button,
  Tooltip,
} from '@mui/material'

import { Logout } from '@mui/icons-material'

import {
  useUserState,
  logout,
  sessionDeleteCookie,
} from 'features/authentication'

type accountSettingsInfoPanelProps = {
  readonly tab: number
  readonly setAccountSettingsModalOpen: (_value: boolean) => void
}

/**
 * @prop tab - The currently open account settings tab.
 * @prop setAccountSettingsModalOpen - A function to set if the account settings modal is open.
 *
 * @example
 * <AccountSettingsInfoPanel tab={tab} setAccountSettingsModalOpen={setAccountSettingsModalOpen} />
 */
function AccountSettingsInfoPanel(_props: accountSettingsInfoPanelProps) {
  const [username, createdAt] = useUserState((_state) => [
    _state.username,
    _state.createdAt,
  ])

  const dateString = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(createdAt))

    return date.toLocaleDateString()
  }, [createdAt])

  const dateTime = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(createdAt))

    return date.toLocaleTimeString()
  }, [createdAt])

  const handleCloseClick = useCallback(() => {
    _props.setAccountSettingsModalOpen(false)
  }, [_props])

  const handleLogoutClick = useCallback(async () => {
    await logout()
    sessionDeleteCookie()
    window.location.pathname = '/login'
  }, [])

  return (
    <>
      {_props.tab === 0 && (
        <Box
          role='tabpanel'
          sx={{
            marginTop: '15px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <List sx={{ width: '100%', paddingTop: 0 }}>
            <ListItem sx={{ width: '100%', paddingTop: 0, paddingBottom: 0 }}>
              <Stack
                direction='row'
                divider={<Divider orientation='vertical' flexItem />}
                sx={{ width: '100%' }}
              >
                <List sx={{ width: '50%' }}>
                  <ListItem
                    sx={{ width: '100%', paddingTop: 0, paddingBottom: 0 }}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{ width: '100%', textAlign: 'right' }}
                    >
                      Account Name
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{ width: '100%', paddingTop: 0, paddingBottom: 0 }}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{ width: '100%', textAlign: 'right' }}
                    >
                      Register Date
                    </Typography>
                  </ListItem>
                </List>

                <List sx={{ width: '50%' }}>
                  <ListItem
                    sx={{
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <Typography variant='subtitle1'>{username}</Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <Tooltip title={dateTime} placement='right'>
                      <Typography variant='subtitle1'>{dateString}</Typography>
                    </Tooltip>
                  </ListItem>
                </List>
              </Stack>
            </ListItem>

            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='text' onClick={handleCloseClick}>
                Close
              </Button>
              <Button variant='contained' onClick={handleLogoutClick}>
                <Logout sx={{ marginRight: '5px' }} />
                Logout
              </Button>
            </ListItem>
          </List>
        </Box>
      )}
    </>
  )
}

export default AccountSettingsInfoPanel
