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
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material'

import { Share, ContentCopy } from '@mui/icons-material'

import type { ModalOpen } from 'modules/edit_song'
import { useSongState } from 'modules/songs'
import useTheme from 'hooks/use_theme'

interface songShareModalProps {
  readonly modalOpen: boolean
  readonly setModalOpen: (_value: ModalOpen) => void
  readonly songIndex: number
  readonly setSongIndex: (_value: number) => void
  readonly setMenu: (_value: boolean) => void
  readonly setAnchor: (_anchor: HTMLElement | null) => void
}

function ShareSongModal(_props: songShareModalProps) {
  const songs = useSongState((_state) => _state.songs)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCloseClick = useCallback(() => {
    _props.setModalOpen('none')
    _props.setMenu(false)
    _props.setSongIndex(-1)
    _props.setAnchor(null)
  }, [_props])

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(songs[_props.songIndex].shareKey)
    setSnackbarOpen(true)
  }, [_props])

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false)
  }, [])

  const theme = useTheme()

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
        <Paper
          className={
            (theme === 'light' && 'paper-light') + ' paper paper-modal'
          }
        >
          <List
            sx={{
              width: '500px',
            }}
          >
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <Share fontSize='large' />
                <Typography variant='h4'>Share Song</Typography>
              </Stack>
            </ListItem>

            <ListItem>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography fontWeight='bold'>
                  {songs[_props.songIndex]?.songName}
                </Typography>
              </Box>
            </ListItem>

            <ListItem>
              <Paper
                sx={{
                  width: '100%',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                elevation={3}
              >
                <Typography>{songs[_props.songIndex]?.shareKey}</Typography>
                <Tooltip title='Copy share key.' placement='top-end'>
                  <IconButton onClick={handleCopyClick}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Paper>
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='text' onClick={handleCloseClick}>
                Close
              </Button>
            </ListItem>
          </List>
        </Paper>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity='info' onClose={handleCloseSnackbar}>
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  )
}

export default ShareSongModal
