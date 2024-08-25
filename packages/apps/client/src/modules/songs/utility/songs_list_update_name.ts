import sleep from 'utility/sleep'
import type { Song } from 'types'
import songGetName from '../services/song_get_name'

async function songListUpdateName(_songList: Song[]): Promise<Song[]> {
  const promise: Promise<Song[]> = new Promise((_resolve, _reject) => {
    // self calling function for async inside of promise
    ;(async () => {
      const unnamedSongs = _songList.reduce((_songs, _song, _index) => {
        if (_song.songName === '') _songs.push(_index)
        return _songs
      }, [] as number[])

      if (unnamedSongs.length === 0) return _reject()

      const updatedList = [..._songList]

      while (unnamedSongs.length > 0) {
        for (let i = 0; i < unnamedSongs.length; i++) {
          const index = unnamedSongs[i]
          if (!updatedList[index].ready) continue
          const name = await songGetName(updatedList[index].entryId).catch(
            () => null
          )

          if (name == null) return _reject()

          if (name !== '') {
            updatedList[index].songName = name
            unnamedSongs.splice(i, 1)
          }
        }

        await sleep(1000)
      }

      _resolve(updatedList)
    })()
  })

  return promise
}

export default songListUpdateName
