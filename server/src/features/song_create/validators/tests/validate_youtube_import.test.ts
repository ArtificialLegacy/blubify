import validateYoutubeImport from '../validate_youtube_import'
import type { YoutubeImportData } from '../../types/youtube_import_data'

describe('validateYoutubeImport', () => {
  it('should return true if data is valid', async () => {
    const result = await validateYoutubeImport({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      name: 'My song',
    } as YoutubeImportData)
    expect(result).toBe(true)
  })

  it('should return false if data is invalid', async () => {
    const result = await validateYoutubeImport({} as YoutubeImportData)
    expect(result).toBe(false)
  })
})
