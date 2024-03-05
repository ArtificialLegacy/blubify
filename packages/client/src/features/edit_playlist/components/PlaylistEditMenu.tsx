import React, { useState, useCallback } from 'react'

import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from '@mui/material'

import { Info, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

import type { ModalOpen } from '../types/modal_open'
import { usePlaylistState } from 'features/playlist'
import submitPlaylistOrderUp from '../services/submit_playlist_order_up'
import submitPlaylistOrderDown from '../services/submit_playlist_order_down'
import PlaylistInfo from './PlaylistInfo'

type playlistEditMenuProps = {
  readonly menuOpen: boolean
  readonly anchor: HTMLElement | null
  readonly setAnchor: (anchor: HTMLElement | null) => void
  readonly setMenu: (_value: boolean) => void
  readonly playlistIndex: number
  readonly setPlaylistIndex: (_value: number) => void
}

/**
 * @prop menuOpen - If the playlist edit menu is open.
 * @prop anchor - The element the menu is anchored to.
 * @prop setAnchor - Sets the menu's anchor element.
 * @prop setMenu - Sets the menu's open/closed state.
 * @prop playlistIndex - The index of the playlist to edit.
 * @prop setPlaylistIndex - Sets the index of the playlist that is being edited.
 *
 * @example
 * <PlaylistEditMenu menuOpen={menuOpen} anchor={anchor} setAnchor={setAnchor} setMenu={setMenu} playlistIndex={playlistIndex} setPlaylistIndex={setPlaylistIndex} />
 */
function PlaylistEditMenu(_props: playlistEditMenuProps) {
  const [modalOpen, setModalOpen] = useState<ModalOpen>('none')

  const [playlists, currentPlaylist, setCurrentPlaylist, swapPlaylists] =
    usePlaylistState((_state) => [
      _state.playlists,
      _state.currentPlaylist,
      _state.setCurrentPlaylist,
      _state.swapPlaylists,
    ])

  const handleClose = () => {
    _props.setAnchor(null)
    _props.setMenu(false)
  }

  const handleMoveUp = useCallback(async () => {
    const status = await submitPlaylistOrderUp(
      playlists[_props.playlistIndex].id
    )
    if (status.status === 'success') {
      swapPlaylists(_props.playlistIndex, _props.playlistIndex - 1)
      _props.setAnchor(null)
      _props.setMenu(false)
      if (currentPlaylist === _props.playlistIndex) {
        setCurrentPlaylist(_props.playlistIndex - 1)
      }
      if (currentPlaylist === _props.playlistIndex - 1) {
        setCurrentPlaylist(_props.playlistIndex)
      }
    }
  }, [playlists, _props, currentPlaylist, setCurrentPlaylist, swapPlaylists])

  const handleMoveDown = useCallback(async () => {
    const status = await submitPlaylistOrderDown(
      playlists[_props.playlistIndex].id
    )
    if (status.status === 'success') {
      swapPlaylists(_props.playlistIndex, _props.playlistIndex + 1)
      _props.setAnchor(null)
      _props.setMenu(false)
      if (currentPlaylist === _props.playlistIndex) {
        setCurrentPlaylist(_props.playlistIndex + 1)
      }
      if (currentPlaylist === _props.playlistIndex + 1) {
        setCurrentPlaylist(_props.playlistIndex)
      }
    }
  }, [playlists, _props, currentPlaylist, setCurrentPlaylist, swapPlaylists])

  const handleInfoClick = useCallback(() => {
    setModalOpen('info')
  }, [_props])

  return (
    <Menu open={_props.menuOpen} onClose={handleClose} anchorEl={_props.anchor}>
      <MenuItem onClick={handleInfoClick}>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <Typography>Playlist Info</Typography>
      </MenuItem>

      <Divider />

      {_props.playlistIndex > 0 && (
        <MenuItem onClick={handleMoveUp}>
          <ListItemIcon>
            <KeyboardArrowUp />
          </ListItemIcon>
          <Typography>Move Up</Typography>
        </MenuItem>
      )}
      {_props.playlistIndex < playlists.length - 1 && (
        <MenuItem onClick={handleMoveDown}>
          <ListItemIcon>
            <KeyboardArrowDown />
          </ListItemIcon>
          <Typography>Move Down</Typography>
        </MenuItem>
      )}

      <PlaylistInfo
        modalOpen={modalOpen === 'info'}
        setModalOpen={setModalOpen}
        playlistIndex={_props.playlistIndex}
        setPlaylistIndex={_props.setPlaylistIndex}
        setMenu={_props.setMenu}
        setAnchor={_props.setAnchor}
      />
    </Menu>
  )
}

export default PlaylistEditMenu
