import React, { useState } from 'react'
import { useFormik } from 'formik'

import {
  Box,
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  Typography,
  Stack,
  InputAdornment,
  Paper,
} from '@mui/material'
import {
  PlaylistAdd,
  LabelOutlined,
  PlaylistAddCheck,
} from '@mui/icons-material'

import playlistSubmit from '../services/submit_playlist'
import type { PlaylistCreateData } from 'types'
import { playlistCreateDataValidationSchema } from 'validators'
import { playlistGetList, usePlaylistState } from 'modules/playlist'
import type { APIResult } from 'types'

type playlistCreateModalProps = {
  readonly open: boolean
  readonly closePlaylistModal: () => void
}

/**
 * @prop open - If the modal is open or not.
 * @prop closePlaylistModal - Function to set the state of the modal being open to false.
 *
 * @example
 * <PlaylistCreateModal open={open} closePlaylistModal={closePlaylistModal} />
 */
function PlaylistCreateModal(_props: playlistCreateModalProps) {
  const [status, setStatus] = useState<APIResult>()

  const setPlaylists = usePlaylistState((_state) => _state.setPlaylists)

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (_values) => {
      const { name } = _values
      const data: PlaylistCreateData = {
        name,
      }

      formik.resetForm()

      const status = await playlistSubmit(data)
      setStatus(status)
      if (status === 'success') _props.closePlaylistModal()

      const playlists = await playlistGetList()
      setPlaylists(playlists)
    },
    validationSchema: playlistCreateDataValidationSchema,
  })

  return (
    <Modal open={_props.open}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Paper>
          <form onSubmit={formik.handleSubmit}>
            <List
              sx={{
                width: '500px',
              }}
            >
              <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                <Stack direction='row' alignItems='center' gap={1}>
                  <PlaylistAdd fontSize='large' />
                  <Typography variant='h4'>Create Playlist</Typography>
                </Stack>
              </ListItem>

              <ListItem>
                <TextField
                  label='Playlist Name'
                  required
                  variant='filled'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    ((formik.touched.name && formik.errors.name) as string) ||
                    '\u00a0'
                  }
                  error={
                    ((formik.touched.name as boolean) &&
                      Boolean(formik.errors.name)) ||
                    status === 'invalid_request'
                  }
                  sx={{ width: '100%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LabelOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  variant='text'
                  color='error'
                  onClick={() => {
                    _props.closePlaylistModal()
                    formik.resetForm()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={!formik.isValid || !formik.dirty}
                >
                  <PlaylistAddCheck sx={{ marginRight: '5px' }} />
                  Create
                </Button>
              </ListItem>
            </List>
          </form>
        </Paper>
        <Box>
          <Typography
            color='error.main'
            display='flex'
            justifyContent='center'
            style={{ paddingTop: '10px' }}
            sx={{
              visibility:
                status === 'invalid_request' || status === 'failed'
                  ? 'visible'
                  : 'hidden',
            }}
          >
            Something went wrong!
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}

export default PlaylistCreateModal
