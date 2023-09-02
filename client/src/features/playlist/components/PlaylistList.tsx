import React, { useState } from 'react'

import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Box,
  ListItem,
  Tooltip,
  IconButton,
  Paper,
} from '@mui/material'
import { PlaylistAdd, QueueMusic, MoreVert } from '@mui/icons-material'

import '../styles/playlist_list.scss'
import { songsGetList, useSongState } from 'features/songs'
import usePlaylistState from '../hooks/playlist_state'
import { PlaylistEditMenu } from 'features/edit_playlist'

type playlistListProps = {
  readonly openCreatePlaylistModal: () => void
}

function PlaylistList(_props: playlistListProps) {
  const [menuOpen, setMenu] = useState(false)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [playlistIndex, setPlaylistIndex] = useState<number>(-1)

  const [setSongs, setCurrentSong] = useSongState((_state) => [
    _state.setSongs,
    _state.setCurrentSong,
  ])

  const [playlists, currentPlaylist, setCurrentPlaylist] = usePlaylistState(
    (_state) => [
      _state.playlists,
      _state.currentPlaylist,
      _state.setCurrentPlaylist,
    ]
  )

  const handleClick = (
    _event: React.MouseEvent<HTMLButtonElement>,
    _index: number
  ) => {
    setAnchor(_event.currentTarget)
    setMenu(true)
    setPlaylistIndex(_index)
  }

  return (
    <Box className='playlist-list' style={{ overflow: 'hidden', padding: 0 }}>
      <Paper sx={{ width: '340px', margin: 0, padding: '10px' }} square>
        <Button
          variant='outlined'
          color='secondary'
          sx={{ width: '100%' }}
          onClick={_props.openCreatePlaylistModal}
        >
          <PlaylistAdd sx={{ marginRight: '5px' }} />
          <Typography>New Playlist</Typography>
        </Button>
      </Paper>

      {
        //<Divider variant='fullWidth' sx={{ marginTop: '15px' }} />
      }

      <List
        sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 132px)', padding: 0 }}
      >
        {playlists?.map((_playlist, _index) => {
          return (
            <ListItem
              key={_playlist.id}
              sx={{ padding: 0 }}
              secondaryAction={
                <Tooltip title='Edit Playlist' placement='left'>
                  <IconButton onClick={(_e) => handleClick(_e, _index)}>
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton
                selected={currentPlaylist === _index}
                onClick={async () => {
                  if (currentPlaylist === _index) return

                  setCurrentPlaylist(_index)
                  setSongs([])
                  setCurrentSong(-1)

                  const songs = await songsGetList(playlists[_index].id)
                  setSongs(songs)
                }}
              >
                <ListItemIcon>
                  <QueueMusic />
                </ListItemIcon>
                <Typography>{_playlist.name}</Typography>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <PlaylistEditMenu
        menuOpen={menuOpen}
        setMenu={setMenu}
        anchor={anchor}
        setAnchor={setAnchor}
        playlistIndex={playlistIndex}
        setPlaylistIndex={setPlaylistIndex}
      />
    </Box>
  )
}

export default PlaylistList
