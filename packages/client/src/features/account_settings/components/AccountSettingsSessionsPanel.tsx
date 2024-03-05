import React, { useState, useCallback, useEffect, useMemo } from 'react'

import {
  Box,
  List,
  ListItem,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Divider,
  Stack,
  Tooltip,
} from '@mui/material'

import { Logout, PersonRemove } from '@mui/icons-material'

import type { Session } from 'types'
import {
  getSessionList,
  logout,
  sessionDeleteCookie,
} from 'features/authentication'
import cookieRead from 'utility/cookie_read'
import submitInvalidateSession from '../services/submit_invalidate_session'

type accountSettingsSessionsPanelProps = {
  readonly tab: number
  readonly setAccountSettingsModalOpen: (_value: boolean) => void
}

/**
 * @prop tab - The currently open account settings tab.
 * @prop setAccountSettingsModalOpen - A function to set if the account settings modal is open.
 *
 * @example
 * <AccountSettingsSessionsPanel tab={tab} setAccountSettingsModalOpen={setAccountSettingsModalOpen} />
 */
function AccountSettingsSessionsPanel(
  _props: accountSettingsSessionsPanelProps
) {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    ;(async () => {
      const sessions = await getSessionList()
      const sessionCookie = cookieRead('session')
      for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionId === sessionCookie) {
          const temp = sessions[i]
          sessions.splice(i, 1)
          sessions.unshift(temp)
        }
      }

      setSessions(sessions)
    })()
  }, [_props.tab])

  const handleCloseClick = useCallback(() => {
    _props.setAccountSettingsModalOpen(false)
  }, [_props])

  const handleLogoutClick = useCallback(async () => {
    await logout()
    sessionDeleteCookie()
    window.location.pathname = '/login'
  }, [])

  const handleInvalidateSessionClick = useCallback(
    async (_sessionId: string, _index: number) => {
      const result = await submitInvalidateSession(_sessionId)
      if (result.status === 'success') {
        const temp = [...sessions]
        temp.splice(_index, 1)
        setSessions(temp)
      }
    },
    [sessions]
  )

  return (
    <>
      {_props.tab === 2 && (
        <Box
          role='tabpanel'
          sx={{
            marginTop: '15px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <List sx={{ width: '100%' }}>
            <List
              sx={{
                width: '100%',
                maxHeight: '350px',
                overflow: 'auto',
              }}
            >
              {sessions.map((_session, _index) => (
                <ListItem key={_index} sx={{ padding: 0 }}>
                  <Container sx={{ width: '100%' }}>
                    {_index === 1 && <Divider sx={{ marginBottom: '10px' }} />}
                    <Card
                      sx={{ width: '100%', marginBottom: '10px' }}
                      variant='outlined'
                    >
                      <CardContent>
                        <Typography variant='subtitle2' color='text.secondary'>
                          Session ID {_index === 0 && '- Current Session'}
                        </Typography>
                        <Typography>{_session.sessionId}</Typography>

                        <Divider />

                        <Stack
                          direction='row'
                          divider={<Divider orientation='vertical' flexItem />}
                          sx={{ width: '100%' }}
                        >
                          <List sx={{ width: '25%' }}>
                            <ListItem
                              sx={{
                                width: '100%',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <Typography>Created</Typography>
                            </ListItem>
                            <ListItem
                              sx={{
                                width: '100%',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <Typography>Device</Typography>
                            </ListItem>
                            <ListItem
                              sx={{
                                width: '100%',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <Typography>IP</Typography>
                            </ListItem>
                          </List>
                          <List sx={{ width: '75%' }}>
                            <ListItem
                              sx={{
                                width: '100%',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <Tooltip
                                title={(() => {
                                  const date = new Date()
                                  date.setTime(Date.parse(_session.createdAt))

                                  return date.toLocaleTimeString()
                                })()}
                                placement='right'
                              >
                                <Typography>
                                  {(() => {
                                    const date = new Date()
                                    date.setTime(Date.parse(_session.createdAt))

                                    return date.toLocaleDateString()
                                  })()}
                                </Typography>
                              </Tooltip>
                            </ListItem>
                            <ListItem
                              sx={{
                                width: '100%',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <Typography>{_session.deviceString}</Typography>
                            </ListItem>
                            <ListItem
                              sx={{
                                width: '100%',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <Typography>{_session.ip}</Typography>
                            </ListItem>
                          </List>
                        </Stack>

                        <Divider />
                      </CardContent>

                      <CardActions>
                        {_index === 0 ? (
                          <Button onClick={handleLogoutClick}>
                            <Logout sx={{ marginRight: '8px' }} />
                            Logout
                          </Button>
                        ) : (
                          <Button
                            color='error'
                            onClick={() =>
                              handleInvalidateSessionClick(
                                _session.sessionId,
                                _index
                              )
                            }
                          >
                            <PersonRemove sx={{ marginRight: '8px' }} />
                            Invalidate Login
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Container>
                </ListItem>
              ))}
            </List>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='text' onClick={handleCloseClick}>
                Close
              </Button>
            </ListItem>
          </List>
        </Box>
      )}
    </>
  )
}

export default AccountSettingsSessionsPanel
