import validateSongNameEdit from '../validate_song_edit_name'
import { EditSongNameData } from '../../types/edit_song_name_data'

describe('validateSongNameEdit', () => {
  it('should return true if data is valid', async () => {
    const result = await validateSongNameEdit({
      name: 'My song',
    } as EditSongNameData)
    expect(result).toBe(true)
  })

  it('should return false if data is invalid', async () => {
    const result = await validateSongNameEdit({} as EditSongNameData)
    expect(result).toBe(false)
  })
})
