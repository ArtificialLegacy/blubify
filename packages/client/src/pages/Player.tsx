import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Box, Drawer, List, ListItem } from '@mui/material'

import {
  PlaylistList,
  playlistGetList,
  usePlaylistState,
} from 'features/playlist'
import { Mainbar } from 'features/mainbar'
import { PlaylistCreateModal } from 'features/create_playlist'
import { checkSession, useUserState } from 'features/authentication'
import useToggle from 'hooks/use_toggle'
import useSwitch from 'hooks/use_switch'
import {
  SongListHeader,
  SongList,
  songsGetList,
  songListUpdateStatus,
  songListUpdateName,
  useSongState,
} from 'features/songs'
import { ImportSongModal } from 'features/import_song'
import { PlayerControl, LoopMode } from 'features/player_control'
import { PlaylistEditModal } from 'features/edit_playlist'
import { AccountSettingsModal } from 'features/account_settings'
import { SessionStatus } from 'types'

function PlayerPage() {
  const [playlistDrawerOpen, handlePlaylistDrawerOpen] = useToggle(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, stogglePlaying] = useToggle(false)
  const [loopMode, setLoopMode] = useState<LoopMode>('next')
  const [playlistEditModalOpen, setPlaylistEditModalOpen] = useState(false)
  const [accountSettingsModalOpen, setAccountSettingsModalOpen] =
    useState(false)

  const [playlists, setPlaylists, currentPlaylist] = usePlaylistState(
    (_state) => [_state.playlists, _state.setPlaylists, _state.currentPlaylist]
  )

  const [songs, setSongs, currentSong, setCurrentSong] = useSongState(
    (_state) => [
      _state.songs,
      _state.setSongs,
      _state.currentSong,
      _state.setCurrentSong,
    ]
  )

  const [setUsername, setCreatedAt, setTheme] = useUserState((_state) => [
    _state.setUsername,
    _state.setCreatedAt,
    _state.setTheme,
  ])

  const [playlistModalOpen, openPlaylistModal, closePlaylistModal] =
    useSwitch(false)

  const [importSongModalOpen, openImportSongModel, closeImportSongModal] =
    useSwitch(false)

  // Code that is run when page is loaded.
  useEffect(() => {
    ;(async function () {
      const sessionData = await checkSession()
      if (sessionData.status === 'invalid') window.location.pathname = '/login'
      else {
        setUsername(sessionData.user?.username ?? '')
        setCreatedAt(sessionData.user?.createdAt ?? '')
        setTheme(sessionData.user?.theme ?? 0)
      }

      setPlaylists(await playlistGetList())
      setSongs(await songsGetList(playlists[currentPlaylist]?.id))
    })()
  }, [])

  useEffect(() => {
    songListUpdateStatus(songs)
      .then((_songs) => {
        setSongs(_songs)
      })
      .catch(() => null)

    songListUpdateName(songs)
      .then((_songs) => {
        setSongs(_songs)
      })
      .catch(() => null)
  }, [songs])

  useEffect(() => {
    if (!songs[currentSong]?.ready || songs[currentSong]?.failed) {
      songEnd()
      return
    }

    stogglePlaying(true)
    audioRef.current?.load()
    audioRef.current?.play()
  }, [currentSong])

  const songEnd = useCallback(() => {
    if (audioRef.current) {
      switch (loopMode) {
        case 'next': {
          if (currentSong === songs.length - 1) setCurrentSong(0)
          else setCurrentSong(currentSong + 1)
          break
        }

        case 'loop_single': {
          audioRef.current.currentTime = 0
          audioRef.current.play()
          break
        }

        case 'shuffle': {
          let nextSong = Math.floor(Math.random() * (songs.length - 1))
          if (nextSong >= currentSong) nextSong++
          setCurrentSong(nextSong)
          break
        }

        case 'one': {
          stogglePlaying(false)
          break
        }
      }
    }
  }, [loopMode, currentSong, songs.length, setCurrentSong, stogglePlaying])

  const togglePlaying = () => {
    if (playing) audioRef.current?.pause()
    else audioRef.current?.play()
    stogglePlaying()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {songs[currentSong]?.filepath ? (
        <audio ref={audioRef} preload='auto' onEnded={songEnd}>
          <source
            src={`${process.env.REACT_APP_API_URL}/api/songs/stream/${songs[currentSong]?.filepath}`}
            type='audio/x-m4a'
          />
        </audio>
      ) : (
        <></>
      )}

      <Mainbar
        drawerOpen={playlistDrawerOpen}
        handleDrawerState={handlePlaylistDrawerOpen}
        setAccountSettingsModalOpen={setAccountSettingsModalOpen}
      />

      <Drawer
        variant='persistent'
        open={playlistDrawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: '340px',
            height: 'calc(100% - 65px)',
            marginTop: '65px',
          },
        }}
      >
        <PlaylistList openCreatePlaylistModal={openPlaylistModal} />
      </Drawer>

      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0 }}>
          <SongListHeader
            drawerOpen={playlistDrawerOpen}
            openImportSongModel={openImportSongModel}
            setPlaylistEditModalOpen={setPlaylistEditModalOpen}
          />
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <SongList drawerOpen={playlistDrawerOpen} />
        </ListItem>
      </List>

      <PlayerControl
        playlistDrawerOpen={playlistDrawerOpen}
        playing={playing}
        togglePlaying={togglePlaying}
        audioRef={audioRef}
        loopMode={loopMode}
        setLoopMode={setLoopMode}
      />

      <ImportSongModal
        importSongModalOpen={importSongModalOpen}
        closeImportSongModal={closeImportSongModal}
      ></ImportSongModal>
      <PlaylistCreateModal
        open={playlistModalOpen}
        closePlaylistModal={closePlaylistModal}
      />
      <PlaylistEditModal
        playlistEditModalOpen={playlistEditModalOpen}
        setPlaylistEditModalOpen={setPlaylistEditModalOpen}
      />
      <AccountSettingsModal
        accountSettingsModalOpen={accountSettingsModalOpen}
        setAccountSettingsModalOpen={setAccountSettingsModalOpen}
      />
    </Box>
  )
}

export default PlayerPage
