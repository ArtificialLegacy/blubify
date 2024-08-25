import sleep from '../sleep'

describe('sleep', () => {
  it('should wait for the specified amount of time', async () => {
    const start = Date.now()
    await sleep(1000)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(1000)
  })
})
