import request from 'supertest'
import app from '~/app'

test('returns 200 and Hello, tacer', async () => {
  const resp = await request(app.callback()).get('/')

  expect(resp.status).toBe(200)
  expect(resp.text).toBe('Hello, tacer')
})
