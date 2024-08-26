import React, { useState, useCallback } from 'react'

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItem,
  IconButton,
  Tooltip,
} from '@mui/material'
import { MusicNote, Downloading, MoreVert, Report } from '@mui/icons-material'

import '../styles/song_list.scss'

import { SongEditMenu } from 'modules/edit_song'
import useSongState from '../hooks/song_state'
import { usePlaylistState } from 'modules/playlist'
import useTheme from 'hooks/use_theme'

type songListProps = {
  readonly drawerOpen: boolean
}

function SongList(_props: songListProps) {
  const [menuOpen, setMenu] = useState(false)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [songIndex, setSongIndex] = useState(-1)

  const [songs, currentSong, setCurrentSong] = useSongState((_state) => [
    _state.songs,
    _state.currentSong,
    _state.setCurrentSong,
  ])

  const currentPlaylist = usePlaylistState((_state) => _state.currentPlaylist)

  const theme = useTheme()

  const handleClick = (
    _event: React.MouseEvent<HTMLButtonElement>,
    _index: number
  ) => {
    setAnchor(_event.currentTarget)
    setMenu(true)
    setSongIndex(_index)
  }

  return currentPlaylist >= 0 ? (
    <Box
      className={
        (_props.drawerOpen ? 'song-list' : 'song-list-closed') +
        ' ' +
        (currentSong >= 0 ? 'song-list-short' : 'song-list-tall')
      }
    >
      <List sx={{ padding: 0 }}>
        {songs.map((_song, _index) => (
          <ListItem
            key={_index}
            sx={{
              padding: 0,
              backdropFilter: 'blur(5px)',
              backgroundColor:
                theme === 'light'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(120, 144, 156, 0.1)',
              borderRadius: '10px',
              marginBottom: '5px',
            }}
            secondaryAction={
              <Tooltip title='Edit Song' placement='left'>
                <IconButton onClick={(_e) => handleClick(_e, _index)}>
                  <MoreVert />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton
              onClick={() => {
                setCurrentSong(_index)
              }}
              selected={currentSong === _index}
              sx={{ borderRadius: '10px' }}
            >
              <ListItemIcon>
                {_song.failed ? (
                  <Report color='error' />
                ) : _song.ready ? (
                  <MusicNote />
                ) : (
                  <Downloading color='warning' />
                )}
              </ListItemIcon>

              <Typography
                color={
                  _song.failed
                    ? 'error'
                    : _song.songName === ''
                    ? 'InactiveCaptionText'
                    : theme === 'light'
                    ? 'MenuText'
                    : 'HighlightText'
                }
              >
                {_song.songName === ''
                  ? 'Song name pending...'
                  : _song.songName}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <SongEditMenu
        menuOpen={menuOpen}
        setMenu={setMenu}
        anchor={anchor}
        setAnchor={setAnchor}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
      />
    </Box>
  ) : (
    <div></div>
  )
}

export default SongList
