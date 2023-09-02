/**
 * Data structure submitted to api for requesting the import of a youtube video.
 */
type YoutubeImportData = {
  url: string
  name: string | null
  playlistid: string
}

export type { YoutubeImportData }
