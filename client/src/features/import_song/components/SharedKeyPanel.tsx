import React, { useState } from 'react'
import { useFormik } from 'formik'

import {
  Box,
  List,
  ListItem,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { Share } from '@mui/icons-material'

import shareImportValidationSchema from '../validators/validate_share_import'
import GenericResult from 'types/generic_result'
import type { ShareImportData } from '../types/share_data_import'
import { usePlaylistState } from 'features/playlist'
import shareImportSubmit from '../services/share_import_submit'
import { songsGetList, useSongState } from 'features/songs'

interface sharedKeyPanelProps {
  readonly tab: number
  readonly closeCreateSongModal: () => void
}

/**
 * @prop tab - The current tab open in the import song modal.
 */
function SharedKeyPanel(_props: sharedKeyPanelProps) {
  const [status, setStatus] = useState<GenericResult>()

  const setSongs = useSongState((_state) => _state.setSongs)

  const [playlists, currentPlaylist] = usePlaylistState((_state) => [
    _state.playlists,
    _state.currentPlaylist,
  ])

  const formik = useFormik({
    initialValues: {
      shareKey: '',
    },
    onSubmit: async (_values) => {
      const { shareKey } = _values

      const data: ShareImportData = {
        shareKey,
        playlistid: playlists[currentPlaylist].id,
      }

      formik.resetForm()

      const status = await shareImportSubmit(data)
      setStatus(status)
      if (status === GenericResult.Success) {
        _props.closeCreateSongModal()
        const songList = await songsGetList(playlists[currentPlaylist].id)
        setSongs(songList)
      }
    },
    validationSchema: shareImportValidationSchema,
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      id='import-share-form'
      style={{ width: '100%' }}
    >
      <Box
        role='tabpanel'
        hidden={_props.tab !== 2}
        sx={{ marginTop: '15px', width: '100%' }}
      >
        <List>
          <ListItem>
            <TextField
              label='Shared Key'
              required
              sx={{ width: '100%' }}
              value={formik.values.shareKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='shareKey'
              helperText={
                status === GenericResult.InvalidRequest
                  ? 'Invalid request made.'
                  : formik.touched.shareKey && formik.errors.shareKey
              }
              error={
                ((formik.touched.shareKey as boolean) &&
                  Boolean(formik.errors.shareKey)) ||
                status === GenericResult.InvalidRequest
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Share />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </ListItem>

          {status === GenericResult.Failed && (
            <ListItem
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Typography color='error'>Something went wrong.</Typography>
            </ListItem>
          )}
        </List>
      </Box>
    </form>
  )
}

export default SharedKeyPanel
