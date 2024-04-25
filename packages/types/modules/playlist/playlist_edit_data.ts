/**
 * Data sent to the server when editing a playlist.
 * @property name - The new name of the playlist.
 */
type PlaylistEditData = {
    name: string
    id: number
}

export type { PlaylistEditData }
