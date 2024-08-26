import React, { useMemo } from 'react'

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

import type { ModalOpen } from '../types/modal_open'
import { usePlaylistState } from 'modules/playlist'
import useTheme from 'hooks/use_theme'

interface playlistInfoProps {
  readonly modalOpen: boolean
  readonly setModalOpen: (_value: ModalOpen) => void
  readonly playlistIndex: number
  readonly setPlaylistIndex: (_value: number) => void
  readonly setMenu: (_value: boolean) => void
  readonly setAnchor: (_anchor: HTMLElement | null) => void
}

/**
 * @prop modalOpen - If the playlist edit modal is open.
 * @prop setModalOpen - Sets the modalOpen state.
 * @prop playlistIndex - The index of the playlist to edit.
 * @prop setPlaylistIndex - Sets the playlistIndex state.
 * @prop setMenu - Sets the menu state.
 * @prop setAnchor - Sets the anchor state.
 *
 * @example
 * <PlaylistInfo modalOpen={modalOpen} setModalOpen={setModalOpen} playlistIndex={playlistIndex} setPlaylistIndex={setPlaylistIndex} setMenu={setMenu} setAnchor={setAnchor} />
 */
function PlaylistInfo(_props: playlistInfoProps) {
  const playlists = usePlaylistState((_state) => _state.playlists)

  const dateString = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(playlists[_props.playlistIndex]?.createdAt))

    return date.toLocaleDateString()
  }, [_props.playlistIndex, playlists])

  const timeString = useMemo(() => {
    const date = new Date()
    date.setTime(Date.parse(playlists[_props.playlistIndex]?.createdAt))

    return date.toLocaleTimeString()
  }, [_props.playlistIndex, playlists])

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
          <List sx={{ width: '500px' }}>
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction='row' alignItems='center' gap={1}>
                <Info fontSize='large' />
                <Typography variant='h4'>Playlist Info</Typography>
              </Stack>
            </ListItem>

            <Divider variant='middle' />

            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {playlists[_props.playlistIndex]?.name}
              </Typography>
            </ListItem>

            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title={timeString}>
                <Typography variant='subtitle1'>
                  {`Playlist created on ${dateString}, with ${
                    playlists[_props.playlistIndex]?.songCount ?? 0
                  } ${
                    playlists[_props.playlistIndex]?.songCount === 1
                      ? 'song'
                      : 'songs'
                  }.`}
                </Typography>
              </Tooltip>
            </ListItem>

            <ListItem>
              <Button
                variant='text'
                onClick={() => {
                  _props.setModalOpen('none')
                  _props.setMenu(false)
                  _props.setPlaylistIndex(-1)
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

export default PlaylistInfo
