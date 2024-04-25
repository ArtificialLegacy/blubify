type SongEntry = {
    entryId: number
    playlistId: string
    songId: number
    ordering: number
    name: string
    createdAt: Date | null
    shareKey: string
}

export type { SongEntry }
