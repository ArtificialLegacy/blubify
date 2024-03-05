import validateShareImport from '../validate_share_import'

describe('validateShareImport', () => {
  it('should return true if data is valid', async () => {
    const result = await validateShareImport({
      shareKey: '00000000-0000-0000-0000-000000000000',
    })
    expect(result).toBe(true)
  })

  it('should return false if data is invalid', async () => {
    const result = await validateShareImport({} as { shareKey: string })
    expect(result).toBe(false)
  })
})
