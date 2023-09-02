/**
 * Data structure for sending a combination of song and song entry data to the client.
 */
type Song = {
  songName: string
  ordering: number
  filepath: string
  ready: boolean
  failed: boolean
  entryId: number
  shareKey: string
}

export type { Song }
