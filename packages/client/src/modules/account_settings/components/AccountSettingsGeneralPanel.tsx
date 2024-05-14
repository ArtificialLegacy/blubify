import React, { useCallback } from 'react'
import { useFormik } from 'formik'

import {
  Box,
  List,
  ListItem,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'

import { Save } from '@mui/icons-material'

import { useUserState } from 'modules/authentication'
import submitGeneralAccountSettings from '../services/submit_general_account_settings'

type accountSettingsGeneralPanelProps = {
  readonly tab: number
  readonly setAccountSettingsModalOpen: (_value: boolean) => void
}

/**
 * @prop tab - The currently open account settings tab.
 * @prop setAccountSettingsModalOpen - A function to set if the account settings modal is open.
 *
 * @example
 * <AccountSettingsGeneralPanel tab={tab} setAccountSettingsModalOpen={setAccountSettingsModalOpen} />
 */
function AccountSettingsGeneralPanel(_props: accountSettingsGeneralPanelProps) {
  const handleCloseClick = useCallback(() => {
    _props.setAccountSettingsModalOpen(false)
  }, [_props])

  const [theme, setTheme] = useUserState((_state) => [
    _state.theme,
    _state.setTheme,
  ])

  const formik = useFormik({
    initialValues: {
      theme: theme,
    },
    onSubmit: async (_values) => {
      const result = await submitGeneralAccountSettings(_values)
      if (result.status === 'success') setTheme(_values.theme)
    },
    enableReinitialize: true,
  })

  return (
    <>
      {_props.tab === 1 && (
        <form
          id='account-general-settings'
          style={{ width: '100%' }}
          onSubmit={formik.handleSubmit}
        >
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
              <ListItem>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id='theme-selector-label'>Theme</InputLabel>
                  <Select
                    labelId='theme-selector-label'
                    label='Theme'
                    sx={{ width: '100%' }}
                    value={formik.values.theme}
                    name='theme'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={0}>System Default</MenuItem>
                    <MenuItem value={1}>Light</MenuItem>
                    <MenuItem value={2}>Dark</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>

              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button variant='text' onClick={handleCloseClick}>
                  Close
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  form='account-general-settings'
                  disabled={!formik.dirty}
                >
                  <Save sx={{ marginRight: '5px' }} />
                  Apply Changes
                </Button>
              </ListItem>
            </List>
          </Box>
        </form>
      )}
    </>
  )
}

export default AccountSettingsGeneralPanel
