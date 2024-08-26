import { create } from 'zustand'
import { Playlist } from 'types'

type PlaylistState = {
  playlists: Playlist[]
  currentPlaylist: number

  setPlaylists: (_playlists: Playlist[]) => void
  setPlaylistCount: (_index: number, _count: number) => void
  setCurrentPlaylist: (_index: number) => void

  swapPlaylists: (_playlist1: number, _playlist2: number) => void
  editPlaylistName: (_playlist: number, _name: string) => void
  deletePlaylist: (_playlist: number) => void
}

const usePlaylistState = create<PlaylistState>((_set) => ({
  playlists: [],
  currentPlaylist: -1,

  setPlaylists: (_playlists: Playlist[]) =>
    _set(() => ({ playlists: _playlists })),

  setPlaylistCount: (_index: number, _count: number) =>
    _set((_state) => {
      const playlists = _state.playlists
      playlists[_index].songCount = _count
      return { playlists }
    }),

  setCurrentPlaylist: (_index: number) =>
    _set(() => ({ currentPlaylist: _index })),

  swapPlaylists: (_playlist1: number, _playlist2: number) =>
    _set((_state) => {
      const playlists = [..._state.playlists]

      const temp = playlists[_playlist1]
      playlists[_playlist1] = playlists[_playlist2]
      playlists[_playlist2] = temp

      return { playlists }
    }),

  editPlaylistName: (_playlist: number, _name: string) => {
    _set((_state) => {
      const playlists = [..._state.playlists]
      playlists[_playlist].name = _name

      return { playlists }
    })
  },

  deletePlaylist: (_playlist: number) => {
    _set((_state) => {
      const playlists = [..._state.playlists]
      playlists.splice(_playlist, 1)
      return { playlists }
    })
  },
}))

export default usePlaylistState
