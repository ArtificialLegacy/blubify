import React, { useState } from 'react'
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
  InputAdornment,
  Button,
} from '@mui/material'

import { Label, LabelOutlined, Edit } from '@mui/icons-material'

import { useSongState } from 'features/songs'
import type { ModalOpen } from '../types/modal_open'
import songEditValidationSchema from '../validators/validate_song_edit_name'
import type { EditSongData } from 'types'
import editNameSongSubmit from '../services/submit_edit_song_name'
import type { APIResult } from 'types'

interface songEditNameProps {
  readonly modalOpen: boolean
  readonly setModalOpen: (_value: ModalOpen) => void
  readonly songIndex: number
  readonly setSongIndex: (_value: number) => void
  readonly setMenu: (_value: boolean) => void
  readonly setAnchor: (_anchor: HTMLElement | null) => void
}

/**
 * Modal component to edit song name
 * @param _props
 * @returns
 */
function SongEditName(_props: songEditNameProps) {
  const [songs, updateSongName] = useSongState((_state) => [
    _state.songs,
    _state.updateSongName,
  ])
  const [status, setStatus] = useState<APIResult>('success')

  const formik = useFormik({
    initialValues: {
      name: songs[_props.songIndex]?.songName,
    },
    onSubmit: async (_values) => {
      const { name } = _values
      const data: EditSongData = {
        name,
      }

      formik.resetForm()

      const status = await editNameSongSubmit(
        data,
        songs[_props.songIndex].entryId
      )
      setStatus(status)
      if (status === 'success') {
        _props.setModalOpen('none')
        _props.setMenu(false)
        _props.setSongIndex(-1)
        _props.setAnchor(null)
        updateSongName(_props.songIndex, name)
      }
    },
    validationSchema: songEditValidationSchema,
  })

  return (
    <Modal open={_props.modalOpen}>
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
                  <Label fontSize='large' />
                  <Typography variant='h4'>Edit Song Name</Typography>
                </Stack>
              </ListItem>

              <ListItem>
                <TextField
                  label='Song Name'
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
                    (formik.touched.name as boolean) &&
                    Boolean(formik.errors.name)
                  }
                  sx={{ width: '100%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LabelOutlined />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </ListItem>

              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  variant='text'
                  color='error'
                  onClick={() => {
                    _props.setModalOpen('none')
                    _props.setMenu(false)
                    _props.setSongIndex(-1)
                    _props.setAnchor(null)
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
                  <Edit sx={{ marginRight: '5px' }} />
                  Edit
                </Button>
              </ListItem>
            </List>
          </form>
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
    </Modal>
  )
}

export default SongEditName
