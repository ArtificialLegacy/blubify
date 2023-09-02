import React, { useCallback } from 'react'

import {
  Paper,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Box,
  Stack,
} from '@mui/material'
import { QueueMusic, Settings, Add } from '@mui/icons-material'

import '../styles/song_list_header.scss'
import { usePlaylistState } from 'features/playlist'

interface songListHeader {
  drawerOpen: boolean
  openImportSongModel: () => void
  setPlaylistEditModalOpen: (_value: boolean) => void
}

function SongListHeader(_props: songListHeader) {
  const [playlists, currentPlaylist] = usePlaylistState((_state) => [
    _state.playlists,
    _state.currentPlaylist,
  ])

  const handleEditPlaylistClick = useCallback(() => {
    _props.setPlaylistEditModalOpen(true)
  }, [_props])

  return currentPlaylist >= 0 ? (
    <Box
      className={
        _props.drawerOpen ? 'song-list-header' : 'song-list-header-closed'
      }
      sx={{ marginTop: '65px' }}
    >
      <Paper square>
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px',
          }}
          direction='row'
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <QueueMusic />
            <Typography sx={{ marginLeft: '5px' }} variant='subtitle1'>
              {currentPlaylist >= 0 && playlists[currentPlaylist].name}
            </Typography>
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <Button
              variant='outlined'
              color='secondary'
              sx={{ marginRight: '10px' }}
              onClick={_props.openImportSongModel}
            >
              <Add sx={{ marginRight: '5px' }} />
              <Typography>New Song</Typography>
            </Button>
            <Tooltip title='Edit Playlist' placement='bottom-start'>
              <IconButton onClick={handleEditPlaylistClick}>
                <Settings />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Paper>
    </Box>
  ) : (
    <div></div>
  )
}

export default SongListHeader
