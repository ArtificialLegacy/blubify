import { create } from 'zustand'
import { Song } from '../types/song'

type SongState = {
  songs: Song[]
  currentSong: number

  setSongs: (_songs: Song[]) => void
  setCurrentSong: (_index: number) => void

  swapSongs: (_song1: number, _song2: number) => void
  deleteSong: (_index: number) => void
  updateSongName: (_index: number, name: string) => void
}

const useSongState = create<SongState>((_set) => ({
  songs: [],
  currentSong: -1,

  setSongs: (_songs: Song[]) => _set(() => ({ songs: _songs })),

  setCurrentSong: (_index: number) => _set(() => ({ currentSong: _index })),

  swapSongs: (_song1: number, _song2: number) =>
    _set((_state) => {
      const songs = [..._state.songs]

      const temp = songs[_song1]
      songs[_song1] = songs[_song2]
      songs[_song2] = temp

      return { songs }
    }),

  deleteSong: (_index: number) =>
    _set((_state) => ({
      songs: _state.songs.filter((_, i) => i !== _index),
    })),

  updateSongName: (_index: number, name: string) =>
    _set((state) => {
      const songs = [...state.songs]
      songs[_index].songName = name
      return { songs: songs }
    }),
}))

export default useSongState
