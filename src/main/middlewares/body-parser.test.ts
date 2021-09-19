import app from '@/main/config/app'
import request from 'supertest'
import { datatype } from 'faker'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    const name = datatype.string()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name })
      .expect({ name })
  })
})
