import validatePlaylistEdit from '../validate_edit_playlist'
import type { PlaylistEditData } from '../../types/playlist_edit_data'

describe('validatePlaylistEdit', () => {
  it('should return true if data is valid', async () => {
    const data: PlaylistEditData = {
      name: 'My playlist',
    }
    const result = await validatePlaylistEdit(data)
    expect(result).toBe(true)
  })

  it('should return false if data is invalid', async () => {
    const result = await validatePlaylistEdit({} as PlaylistEditData)
    expect(result).toBe(false)
  })
})
