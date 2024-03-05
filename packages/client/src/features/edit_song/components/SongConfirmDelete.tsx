import React, { useState, useCallback } from 'react'

import {
  Modal,
  Box,
  Paper,
  List,
  ListItem,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material'

import { DeleteForever } from '@mui/icons-material'

import type { ModalOpen } from '../types/modal_open'
import { useSongState } from 'features/songs'
import submitDeleteSong from '../services/submit_delete_song'
import type { APIResult } from 'types'

interface songConfirmDeleteProps {
  readonly modalOpen: boolean
  readonly setModalOpen: (_value: ModalOpen) => void
  readonly songIndex: number
  readonly setSongIndex: (_value: number) => void
  readonly setMenu: (_value: boolean) => void
  readonly setAnchor: (_anchor: HTMLElement | null) => void
}

/**
 *
 */
function SongConfirmDelete(_props: songConfirmDeleteProps) {
  const [status, setStatus] = useState<APIResult>('success')

  const [songs, deleteSong, currentSong, setCurrentSong] = useSongState(
    (_state) => [
      _state.songs,
      _state.deleteSong,
      _state.currentSong,
      _state.setCurrentSong,
    ]
  )

  const handleDeleteClick = useCallback(async () => {
    const result = await submitDeleteSong(songs[_props.songIndex].entryId)
    setStatus(result)
    if (result === 'success') {
      deleteSong(_props.songIndex)
      if (_props.songIndex === currentSong) {
        setCurrentSong(-1)
      }

      _props.setModalOpen('none')
      _props.setMenu(false)
      _props.setSongIndex(-1)
      _props.setAnchor(null)
    }
  }, [songs, _props, currentSong, setCurrentSong, deleteSong])

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
          <List
            sx={{
              width: '400px',
            }}
          >
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <DeleteForever fontSize='large' color='error' />
                <Typography variant='h4' color='error'>
                  Confirm Deletion
                </Typography>
              </Stack>
            </ListItem>

            <Divider variant='middle' />

            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='subtitle1' color='error'>
                Warning: Deleting a song is a destructive action.
              </Typography>
            </ListItem>

            <Divider variant='middle' />

            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='column' sx={{ textAlign: 'center' }}>
                <Typography variant='subtitle1'>
                  Are you sure you want to delete:
                </Typography>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {songs[_props.songIndex]?.songName}
                </Typography>
              </Stack>
            </ListItem>

            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='text'
                color='primary'
                onClick={() => {
                  _props.setModalOpen('none')
                  _props.setMenu(false)
                  _props.setSongIndex(-1)
                  _props.setAnchor(null)
                }}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={handleDeleteClick}
              >
                <DeleteForever sx={{ marginRight: '5px' }} />
                Delete Song
              </Button>
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
    </Modal>
  )
}

export default SongConfirmDelete
