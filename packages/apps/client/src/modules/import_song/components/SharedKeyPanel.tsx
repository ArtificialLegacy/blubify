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

import { shareImportValidationSchema } from 'validators'
import type { APIResult } from 'types'
import type { ShareImportData } from 'types'
import { usePlaylistState } from 'modules/playlist'
import shareImportSubmit from '../services/share_import_submit'
import { songsGetList, useSongState } from 'modules/songs'

interface sharedKeyPanelProps {
  readonly tab: number
  readonly closeCreateSongModal: () => void
}

/**
 * @prop tab - The current tab open in the import song modal.
 */
function SharedKeyPanel(_props: sharedKeyPanelProps) {
  const [status, setStatus] = useState<APIResult>()

  const setSongs = useSongState((_state) => _state.setSongs)

  const [playlists, currentPlaylist, setPlaylistCount] = usePlaylistState(
    (_state) => [
      _state.playlists,
      _state.currentPlaylist,
      _state.setPlaylistCount,
    ]
  )

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
      if (status === 'success') {
        _props.closeCreateSongModal()
        const songList = await songsGetList(playlists[currentPlaylist].id)
        setSongs(songList)
        setPlaylistCount(
          currentPlaylist,
          (playlists[currentPlaylist].songCount ?? 0) + 1
        )
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
                status === 'invalid_request'
                  ? 'Invalid request made.'
                  : formik.touched.shareKey && formik.errors.shareKey
              }
              error={
                ((formik.touched.shareKey as boolean) &&
                  Boolean(formik.errors.shareKey)) ||
                status === 'invalid_request'
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

          {status === 'failed' && (
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
