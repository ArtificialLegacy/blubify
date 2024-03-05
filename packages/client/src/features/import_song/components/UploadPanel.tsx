import React, { useState, useRef } from 'react'
import { useFormik } from 'formik'

import { Box, List, ListItem, InputAdornment, TextField } from '@mui/material'
import { LabelOutlined } from '@mui/icons-material'

import FileInput from 'components/FileInput'
import uploadImportValidationSchema from '../validators/validate_upload_import'
import type { APIResult } from 'types'
import uploadImportSubmit from '../services/upload_import_submit'
import { songsGetList, useSongState } from 'features/songs'
import { usePlaylistState } from 'features/playlist'
import readFile from 'utility/read_file'

interface uploadPanelProps {
  readonly tab: number
  readonly closeCreateSongModal: () => void
}

/**
 * @prop tab - The current tab open in the import song modal.
 */
function UploadPanel(_props: uploadPanelProps) {
  const [status, setStatus] = useState<APIResult>('success')

  const setSongs = useSongState((_state) => _state.setSongs)

  const fileInput = useRef<HTMLInputElement>(null)

  const [playlists, currentPlaylist] = usePlaylistState((_state) => [
    _state.playlists,
    _state.currentPlaylist,
  ])

  const formik = useFormik({
    initialValues: {
      file: {} as File,
      name: '',
    },
    onSubmit: async (_values) => {
      const { file } = _values
      let { name } = _values

      if (name === '')
        name = file.slice(12, file.name?.length) as unknown as string

      if (fileInput.current == null || fileInput.current.files == null) return

      const formData = new FormData()
      formData.append('file', fileInput.current.files[0])
      formData.append('name', name)
      formData.append('playlist', playlists[currentPlaylist].id)

      formik.resetForm()

      const status = await uploadImportSubmit(formData)
      setStatus(status)
      if (status === 'success') {
        _props.closeCreateSongModal()
        const songList = await songsGetList(playlists[currentPlaylist].id)
        setSongs(songList)
      }
    },
    validationSchema: uploadImportValidationSchema,
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      id='import-upload-form'
      style={{ width: '100%' }}
    >
      <Box
        role='tabpanel'
        hidden={_props.tab !== 1}
        sx={{ marginTop: '15px', width: '100%' }}
      >
        <List>
          <ListItem>
            <FileInput
              fileAccepts='audio/*'
              value={formik.values.file}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='file'
              ref={fileInput}
              helperText={
                status === 'invalid_request'
                  ? 'Invalid request made.'
                  : (formik.touched.file?.name && formik.errors.file?.name) ||
                    '\u00a0'
              }
              error={
                ((formik.touched.file as unknown as boolean) &&
                  Boolean(formik.errors.file)) ||
                status === 'invalid_request'
              }
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
                status === 'invalid_request'
                  ? 'Invalid request made.'
                  : (formik.touched.name && formik.errors.name) || '\u00a0'
              }
              error={
                ((formik.touched.name as boolean) &&
                  Boolean(formik.errors.name)) ||
                status === 'invalid_request'
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <LabelOutlined />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </ListItem>
        </List>
      </Box>
    </form>
  )
}

export default UploadPanel
