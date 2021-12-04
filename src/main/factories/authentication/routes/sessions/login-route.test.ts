import app from '@/main/config/express/app'
import { AccessTokenModel } from '@/domain/authentication'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { UsersRepositoryMemory } from '@/infra/authentication/repositories/users/memory'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

let validToken: string
const url = '/auth/session'
let server: http.Server
let agent: SuperAgentTest

describe('POST /session - Login', () => {
  beforeAll(async (done) => {
    UsersRepositoryMemory.getRepository().entities = []
    server = app.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    return server && server.close(done)
  })

  test('Should return created status code if succeeds', async () => {
    const response = await agent
      .post(url)
      .send({
        token: validToken
      })
    expect(response.status).toBe(HttpStatusCode.created)
    const accessToken = response.body as AccessTokenModel
    expect(accessToken.access_token).toBeTruthy()
    expect(accessToken.refresh_token).toBeTruthy()
    expect(accessToken.user_type).toBeTruthy()
  })

  test('Should return unprocessableEntity status code if token is not provide', async () => {
    await agent
      .post(url)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if token is invalid', async () => {
    await agent
      .post(url)
      .send({
        token: faker.datatype.uuid()
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test.skip('Should return UnprocessableEntity status code if password is not provided in token', async () => {
    // await agent
    //   .post(url)
    //   .send({
    //     token: CreatePublicEncryptedToken(config.criptography.publicKey, {
    //       email: faker.internet.email()
    //     })
    //   })
    //   .expect(HttpStatusCode.unprocessableEntity)
  })

  test.skip('Should return UnprocessableEntity status code if email is not provided in token', async () => {
    // await agent
    //   .post(url)
    //   .send({
    //     token: CreatePublicEncryptedToken(config.criptography.publicKey, {
    //       password: faker.internet.password()
    //     })
    //   })
    //   .expect(HttpStatusCode.unprocessableEntity)
  })

  test.skip('Should return unauthorized status code if credentials is invalid', async () => {
    // await agent
    //   .post(url)
    //   .send({
    //     token: CreatePublicEncryptedToken(config.criptography.publicKey, {
    //       identification: faker.internet.email(),
    //       password: faker.internet.email()
    //     })
    //   })
    //   .expect(HttpStatusCode.unauthorized)
  })
})
