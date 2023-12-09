type SongEntry = {
  entry_id: number
  playlist_id: string
  song_id: number
  ordering: number
  song_name: string
  created_at: Date | null
  share_key: string
}

export type { SongEntry }
