import validatePlaylistCreateData from '../validate_playlist_create_data'

import type { PlaylistCreateData } from 'types'

describe('validatePlaylistCreateData', () => {
  it('should return true if valid', async () => {
    const valid = await validatePlaylistCreateData({
      name: 'name',
    })
    expect(valid).toBe(true)
  })

  it('should return false if invalid', async () => {
    const valid = await validatePlaylistCreateData(
      {} as unknown as PlaylistCreateData
    )
    expect(valid).toBe(false)
  })
})
