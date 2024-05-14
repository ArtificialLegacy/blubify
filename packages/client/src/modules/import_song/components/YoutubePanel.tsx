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
import { LabelOutlined, Link } from '@mui/icons-material'

import { youtubeImportValidationSchema } from 'validators'
import { YoutubeImportData } from 'types'
import youtubeImportSubmit from '../services/youtube_import_submit'
import type { APIResult } from 'types'
import { songsGetList, useSongState } from 'modules/songs'
import { usePlaylistState } from 'modules/playlist'

type youtubePanelProps = {
  readonly tab: number
  readonly closeCreateSongModal: () => void
}

/**
 * @prop tab - The current tab open in the import song modal.
 * @prop closeCreateSongModal - close the song import modal.
 * @prop playlistId - the current playlist id.
 */
function YoutubePanel(_props: youtubePanelProps) {
  const [status, setStatus] = useState<APIResult>('success')

  const setSongs = useSongState((_state) => _state.setSongs)

  const [playlists, currentPlaylist] = usePlaylistState((_state) => [
    _state.playlists,
    _state.currentPlaylist,
  ])

  const formik = useFormik({
    initialValues: {
      url: '',
      name: '',
    },
    onSubmit: async (_values) => {
      const { url, name } = _values

      const data: YoutubeImportData = {
        url,
        name,
        playlistid: playlists[currentPlaylist].id,
      }

      formik.resetForm()

      const status = await youtubeImportSubmit(data)
      setStatus(status)
      if (status === 'success') {
        _props.closeCreateSongModal()
        const songList = await songsGetList(playlists[currentPlaylist].id)
        setSongs(songList)
      }
    },
    validationSchema: youtubeImportValidationSchema,
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      id='import-youtube-form'
      style={{ width: '100%' }}
    >
      <Box
        role='tabpanel'
        hidden={_props.tab !== 0}
        sx={{ marginTop: '15px', width: '100%' }}
      >
        <List>
          <ListItem>
            <TextField
              label='Youtube URL'
              required
              sx={{ width: '100%' }}
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='url'
              helperText={
                status === 'invalid_request'
                  ? 'Invalid request made.'
                  : (formik.touched.url && formik.errors.url) || '\u00a0'
              }
              error={
                ((formik.touched.url as boolean) &&
                  Boolean(formik.errors.url)) ||
                status === 'invalid_request'
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Link />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              label='Song Name'
              sx={{ width: '100%' }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='name'
              helperText={
                (formik.touched.name && formik.errors.name) || '\u00a0'
              }
              error={
                (formik.touched.name as boolean) && Boolean(formik.errors.name)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <LabelOutlined />
                  </InputAdornment>
                ),
              }}
            />
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

export default YoutubePanel
