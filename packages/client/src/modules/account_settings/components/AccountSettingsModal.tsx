import React, { useState, useMemo, useEffect } from 'react'

import {
  Modal,
  Box,
  Paper,
  List,
  ListItem,
  Stack,
  Typography,
  Tab,
  Tabs,
  Button,
} from '@mui/material'

import { ManageAccounts } from '@mui/icons-material'

import AccountSettingsInfoPanel from './AccountSettingsInfoPanel'
import AccountSettingsGeneralPanel from './AccountSettingsGeneralPanel'
import AccountSettingsSessionsPanel from './AccountSettingsSessionsPanel'

interface accountSettingsModalProps {
  readonly accountSettingsModalOpen: boolean
  readonly setAccountSettingsModalOpen: (_value: boolean) => void
}

/**
 * @prop accountSettingsModalOpen - A boolean that determines if the modal is open or not.
 * @prop setAccountSettingsModalOpen - A function that sets the modal open state.
 *
 * @example
 * <AccountSettingsModal accountSettingsModalOpen={accountSettingsModalOpen} setAccountSettingsModalOpen={setAccountSettingsModalOpen} />
 */
function AccountSettingsModal(_props: accountSettingsModalProps) {
  const [tab, setTab] = useState(0)

  const handleTabChange = (_e: React.SyntheticEvent, _value: number) => {
    setTab(_value)
  }

  useEffect(() => {
    setTab(0)
  }, [_props])

  return (
    <Modal open={_props.accountSettingsModalOpen}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Paper sx={{ position: 'relative' }}>
          {process.env.NODE_ENV === 'development' && (
            <Typography
              variant='body2'
              sx={{ position: 'absolute', left: '2px' }}
            >
              DEV BUILD
            </Typography>
          )}
          <List
            sx={{
              width: '500px',
            }}
          >
            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <ManageAccounts fontSize='large' />
                <Typography variant='h4'>Account Settings</Typography>
              </Stack>
            </ListItem>

            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  textColor='secondary'
                  indicatorColor='secondary'
                >
                  <Tab label='Info' />
                  <Tab label='General' />
                  <Tab label='Sessions' />
                </Tabs>
              </Box>

              <AccountSettingsInfoPanel
                tab={tab}
                setAccountSettingsModalOpen={_props.setAccountSettingsModalOpen}
              />

              <AccountSettingsGeneralPanel
                tab={tab}
                setAccountSettingsModalOpen={_props.setAccountSettingsModalOpen}
              />

              <AccountSettingsSessionsPanel
                tab={tab}
                setAccountSettingsModalOpen={_props.setAccountSettingsModalOpen}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Modal>
  )
}

export default AccountSettingsModal
