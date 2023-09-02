import sleep from 'utility/sleep'
import { Song } from '../types/song'
import songGetStatus from '../services/songs_get_status'

async function songListUpdateStatus(_songList: Song[]): Promise<Song[]> {
  const promise: Promise<Song[]> = new Promise((_resolve, _reject) => {
    // self calling function for async inside of promise
    ;(async () => {
      const unreadySongs = _songList.reduce((_songs, _song, _index) => {
        if (!_song.ready) _songs.push(_index)
        return _songs
      }, [] as number[])

      if (unreadySongs.length === 0) return _reject()

      const updatedList = [..._songList]

      while (unreadySongs.length > 0) {
        for (let i = 0; i < unreadySongs.length; i++) {
          const index = unreadySongs[i]
          const status = await songGetStatus(updatedList[index].filepath).catch(
            () => null
          )

          if (status == null) return _reject()

          if (status) {
            updatedList[index].ready = true
            unreadySongs.splice(i, 1)
          }
        }

        await sleep(1000)
      }

      _resolve(updatedList)
    })()
  })

  return promise
}

export default songListUpdateStatus
