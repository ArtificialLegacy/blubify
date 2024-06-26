import React, { useCallback, useState } from 'react'

import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from '@mui/material'

import {
  Label,
  Delete,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Share,
  Image,
  Info,
} from '@mui/icons-material'

import SongEditName from './SongEditName'
import type { ModalOpen } from '../types/modal_open'
import { useSongState } from 'modules/songs'
import submitSongOrderUp from '../services/submit_song_order_up'
import submitSongOrderDown from '../services/submit_song_order_down'
import SongConfirmDelete from './SongConfirmDelete'
import SongInfo from './SongInfo'
import { ShareSongModal } from 'modules/share_song'

type songEditMenuProps = {
  readonly menuOpen: boolean
  readonly anchor: HTMLElement | null
  readonly setAnchor: (_anchor: HTMLElement | null) => void
  readonly setMenu: (_value: boolean) => void
  readonly songIndex: number
  readonly setSongIndex: (value: number) => void
}

function SongEditMenu(_props: songEditMenuProps) {
  const [modalOpen, setModalOpen] = useState<ModalOpen>('none')
  const [songs, swapSongs, setCurrentSong, currentSong] = useSongState(
    (_state) => [
      _state.songs,
      _state.swapSongs,
      _state.setCurrentSong,
      _state.currentSong,
    ]
  )

  const handleClose = () => {
    _props.setAnchor(null)
    _props.setMenu(false)
  }

  const handleNameClick = useCallback(() => {
    setModalOpen('edit_name')
  }, [_props, setModalOpen])

  const handleShareClick = useCallback(() => {
    setModalOpen('share')
  }, [_props, setModalOpen])

  const handleMoveUp = useCallback(async () => {
    const status = await submitSongOrderUp(songs[_props.songIndex].entryId)
    if (status.status === 'success') {
      swapSongs(_props.songIndex, _props.songIndex - 1)
      _props.setAnchor(null)
      _props.setMenu(false)
      if (currentSong === _props.songIndex) {
        setCurrentSong(_props.songIndex - 1)
      }
      if (currentSong === _props.songIndex - 1) {
        setCurrentSong(_props.songIndex)
      }
    }
  }, [songs, swapSongs, _props, currentSong, setCurrentSong])

  const handleMoveDown = useCallback(async () => {
    const status = await submitSongOrderDown(songs[_props.songIndex].entryId)
    if (status.status === 'success') {
      swapSongs(_props.songIndex, _props.songIndex + 1)
      _props.setAnchor(null)
      _props.setMenu(false)
      if (currentSong === _props.songIndex) {
        setCurrentSong(_props.songIndex + 1)
      }
      if (currentSong === _props.songIndex + 1) {
        setCurrentSong(_props.songIndex)
      }
    }
  }, [songs, swapSongs, _props])

  const handleDeleteClick = useCallback(() => {
    setModalOpen('confirm_delete')
  }, [_props])

  const handleInfoClick = useCallback(() => {
    setModalOpen('info')
  }, [_props])

  return (
    <Menu open={_props.menuOpen} anchorEl={_props.anchor} onClose={handleClose}>
      <MenuItem onClick={handleInfoClick}>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <Typography>Song Info</Typography>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleNameClick}>
        <ListItemIcon>
          <Label />
        </ListItemIcon>
        <Typography>Edit Name</Typography>
      </MenuItem>
      {/*
        <MenuItem>
          <ListItemIcon>
            <Image />
          </ListItemIcon>
          <Typography>Edit Icon</Typography>
        </MenuItem>
      */}

      <Divider />

      {_props.songIndex > 0 && (
        <MenuItem onClick={handleMoveUp}>
          <ListItemIcon>
            <KeyboardArrowUp />
          </ListItemIcon>
          <Typography>Move Up</Typography>
        </MenuItem>
      )}
      {_props.songIndex < songs.length - 1 && (
        <MenuItem onClick={handleMoveDown}>
          <ListItemIcon>
            <KeyboardArrowDown />
          </ListItemIcon>
          <Typography>Move Down</Typography>
        </MenuItem>
      )}

      {songs.length > 1 && <Divider />}

      <MenuItem onClick={handleShareClick}>
        <ListItemIcon>
          <Share color='primary' />
        </ListItemIcon>
        <Typography color='primary'>Share Song</Typography>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleDeleteClick}>
        <ListItemIcon>
          <Delete color='error' />
        </ListItemIcon>
        <Typography color='error'>Delete Song</Typography>
      </MenuItem>

      <SongEditName
        modalOpen={modalOpen === 'edit_name'}
        setModalOpen={setModalOpen}
        songIndex={_props.songIndex}
        setSongIndex={_props.setSongIndex}
        setMenu={_props.setMenu}
        setAnchor={_props.setAnchor}
      />
      <SongConfirmDelete
        modalOpen={modalOpen === 'confirm_delete'}
        setModalOpen={setModalOpen}
        songIndex={_props.songIndex}
        setSongIndex={_props.setSongIndex}
        setMenu={_props.setMenu}
        setAnchor={_props.setAnchor}
      />
      <SongInfo
        modalOpen={modalOpen === 'info'}
        setModalOpen={setModalOpen}
        songIndex={_props.songIndex}
        setSongIndex={_props.setSongIndex}
        setMenu={_props.setMenu}
        setAnchor={_props.setAnchor}
      />
      <ShareSongModal
        modalOpen={modalOpen === 'share'}
        setModalOpen={setModalOpen}
        songIndex={_props.songIndex}
        setSongIndex={_props.setSongIndex}
        setMenu={_props.setMenu}
        setAnchor={_props.setAnchor}
      />
    </Menu>
  )
}

export default SongEditMenu
