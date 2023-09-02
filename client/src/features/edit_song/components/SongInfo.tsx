import React, { useState, useMemo } from 'react'

import {
  Modal,
  Box,
  Paper,
  List,
  ListItem,
  Stack,
  Typography,
  Divider,
  Button,
  Tooltip,
} from '@mui/material'

import { Info } from '@mui/icons-material'

import { useSongState } from 'features/songs'
import ModalOpen from '../types/modal_open'

interface songInfoProps {
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
function SongInfo(_props: songInfoProps) {
  const songs = useSongState((_state) => _state.songs)

  const songDate = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(songs[_props.songIndex]?.createdAt))

    return date.toLocaleDateString()
  }, [_props])

  const songTime = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(songs[_props.songIndex]?.createdAt))

    return date.toLocaleTimeString()
  }, [_props])

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
              width: '500px',
            }}
          >
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <Info fontSize='large' />
                <Typography variant='h4'>Song Info</Typography>
              </Stack>
            </ListItem>

            <Divider variant='middle' />

            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {songs[_props.songIndex]?.songName}
              </Typography>
            </ListItem>

            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title={songTime}>
                <Typography variant='subtitle1'>{`Song entry added on ${songDate}.`}</Typography>
              </Tooltip>
            </ListItem>

            <ListItem>
              <Button
                variant='text'
                onClick={() => {
                  _props.setModalOpen(ModalOpen.None)
                  _props.setMenu(false)
                  _props.setSongIndex(-1)
                  _props.setAnchor(null)
                }}
              >
                Close
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Modal>
  )
}

export default SongInfo
