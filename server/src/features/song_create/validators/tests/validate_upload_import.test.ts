import validateUploadImport from '../validate_upload_import'
import formidable from 'formidable'

describe('validateUploadImport', () => {
  it('should return true if data is valid', async () => {
    const result = await validateUploadImport(
      {
        name: ['My song'],
        playlist: ['00000000-0000-0000-0000-000000000000'],
      } as unknown as formidable.Fields<string>,
      {
        file: [{}],
      } as unknown as formidable.Files<string>
    )
    expect(result).toBe(true)
  })

  it('should return false if data is invalid', async () => {
    const result = await validateUploadImport(
      {} as formidable.Fields<string>,
      {} as formidable.Files<string>
    )
    expect(result).toBe(false)
  })
})
