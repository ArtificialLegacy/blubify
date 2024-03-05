/**
 * Playlist data for sending to the client.
 * @property id - The ID of the playlist.
 * @property name - The name of the playlist.
 * @property createdAt - The date the playlist was created.
 * @property ordering - Used to sort the playlists.
 */
type Playlist = {
    id: string
    name: string
    createdAt: string
    ordering: number
    songCount?: number
}

export type { Playlist }
