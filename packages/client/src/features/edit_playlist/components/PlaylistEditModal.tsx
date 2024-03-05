import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useFormik } from 'formik'

import {
  Modal,
  Box,
  Paper,
  List,
  ListItem,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Divider,
  Tooltip,
} from '@mui/material'

import {
  EditNote,
  Save,
  LabelOutlined,
  WarningAmberOutlined,
  DeleteForever,
} from '@mui/icons-material'

import { usePlaylistState } from 'features/playlist'
import playlistEditValidationSchema from '../validators/validate_playlist_edit'
import type { PlaylistEditData } from 'types'
import submitPlaylistEdit from '../services/submit_playlist_edit'
import { APIResult } from 'types'
import submitPlaylistDelete from '../services/submit_playlist_delete'

interface playlistEditModalProps {
  readonly playlistEditModalOpen: boolean
  readonly setPlaylistEditModalOpen: (_value: boolean) => void
}

/**
 * @prop playlistEditModalOpen - If the playlist edit modal is open.
 * @prop setPlaylistEditModalOpen - Set the playlist edit modal open state.
 *
 * @example
 * <PlaylistEditModal playlistEditModalOpen={playlistEditModalOpen} setPlaylistEditModalOpen={setPlaylistEditModalOpen} />
 */
function PlaylistEditModal(_props: playlistEditModalProps) {
  const [status, setStatus] = useState<APIResult>('success')
  const [deleteClicked, setDeleteClicked] = useState(false)

  const [
    playlists,
    currentPlaylist,
    setCurrentPlaylist,
    editPlaylistName,
    deletePlaylist,
  ] = usePlaylistState((_state) => [
    _state.playlists,
    _state.currentPlaylist,
    _state.setCurrentPlaylist,
    _state.editPlaylistName,
    _state.deletePlaylist,
  ])

  const handleDeleteClick = useCallback(() => {
    setDeleteClicked(true)
  }, [setDeleteClicked])

  const handleCancelDeleteClick = useCallback(() => {
    setDeleteClicked(false)
  }, [setDeleteClicked])

  const handleConfirmDeleteClick = useCallback(async () => {
    const response = await submitPlaylistDelete(playlists[currentPlaylist].id)

    if (response.status === 'success') {
      _props.setPlaylistEditModalOpen(false)

      deletePlaylist(currentPlaylist)
      setCurrentPlaylist(-1)
    }

    setStatus(response.status)
  }, [playlists, currentPlaylist, _props, deletePlaylist, setCurrentPlaylist])

  useEffect(() => {
    setDeleteClicked(false)
  }, [_props.playlistEditModalOpen])

  const dateString = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(playlists[currentPlaylist]?.createdAt))

    return date.toLocaleDateString()
  }, [currentPlaylist, playlists])

  const timeString = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(playlists[currentPlaylist]?.createdAt))

    return date.toLocaleTimeString()
  }, [currentPlaylist, playlists])

  const formik = useFormik({
    initialValues: {
      name: playlists[currentPlaylist]?.name || '',
    },
    onSubmit: async (_values) => {
      const { name } = _values
      const data: PlaylistEditData = {
        name,
      }

      const response = await submitPlaylistEdit(
        playlists[currentPlaylist].id,
        data
      )

      if (response.status === 'success') {
        _props.setPlaylistEditModalOpen(false)
        editPlaylistName(currentPlaylist, name)
        formik.resetForm()
      }

      setStatus(response.status)
    },
    validationSchema: playlistEditValidationSchema,
    enableReinitialize: true,
  })

  const handleCloseClick = useCallback(() => {
    _props.setPlaylistEditModalOpen(false)
    formik.resetForm()
  }, [_props, formik])

  return (
    <Modal open={_props.playlistEditModalOpen}>
      <form onSubmit={formik.handleSubmit} id='edit-playlist-form'>
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
            <List
              sx={{
                width: '500px',
              }}
            >
              <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                <Stack direction='row' alignItems='center' gap={1}>
                  <EditNote fontSize='large' />
                  <Typography variant='h4'>
                    {playlists[currentPlaylist]?.name}
                  </Typography>
                </Stack>
              </ListItem>

              <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title={timeString}>
                  <Typography variant='subtitle1'>
                    {`Playlist created on ${dateString}, with ${
                      playlists[currentPlaylist]?.songCount ?? 0
                    } ${
                      playlists[currentPlaylist]?.songCount === 1
                        ? 'song'
                        : 'songs'
                    }.`}
                  </Typography>
                </Tooltip>
              </ListItem>

              <Divider variant='middle' sx={{ marginBottom: '10px' }} />

              <ListItem>
                <TextField
                  label='Playlist Name'
                  required
                  sx={{ width: '100%' }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    (formik.touched.name && formik.errors.name) || '\u00a0'
                  }
                  error={
                    (formik.touched.name as boolean) &&
                    Boolean(formik.errors.name)
                  }
                  name='name'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LabelOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>

              <Divider variant='middle' />

              <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip
                  title='These actions cannot be undone.'
                  placement='top'
                >
                  <Stack direction='row' alignItems='center' gap={1}>
                    <WarningAmberOutlined fontSize='large' color='error' />
                    <Typography variant='h5' color='error'>
                      Dangerous Actions
                    </Typography>
                  </Stack>
                </Tooltip>
              </ListItem>

              <ListItem>
                {deleteClicked ? (
                  <Button
                    variant='contained'
                    sx={{ width: '100%' }}
                    onClick={handleCancelDeleteClick}
                  >
                    Cancel Deletion
                  </Button>
                ) : (
                  <Button
                    variant='outlined'
                    color='error'
                    sx={{ width: '100%' }}
                    onClick={handleDeleteClick}
                  >
                    Delete Playlist
                  </Button>
                )}
              </ListItem>

              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button variant='text' onClick={handleCloseClick}>
                  Close
                </Button>
                {deleteClicked ? (
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={handleConfirmDeleteClick}
                  >
                    <DeleteForever />
                    Delete Playlist
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    type='submit'
                    form='edit-playlist-form'
                    disabled={!formik.dirty || !formik.isValid}
                  >
                    <Save sx={{ marginRight: '5px' }} />
                    Apply Changes
                  </Button>
                )}
              </ListItem>
            </List>
          </Paper>
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
      </form>
    </Modal>
  )
}

export default PlaylistEditModal
