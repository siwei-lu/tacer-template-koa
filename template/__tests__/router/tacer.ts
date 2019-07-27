import request from 'supertest'
import app from '~'

test('tacer router works', async () => {
  const resp = await request(app.callback()).get('/')

  expect(resp.status).toBe(200)
  expect(resp.text).toBe('Hello, tacer')
})
