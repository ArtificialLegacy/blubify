/**
 * Playlist data for sending to the client.
 */
type Playlist = {
  id: string
  name: string
  createdAt: Date
  ordering: number
}

export type { Playlist }
