import app from '@/main/config/express/app'
import { AccessTokenModel, mockUserTypeModel } from '@/domain/authentication'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { mockCreateAccessToken, mockCreateUser } from '@/main/factories/authentication/mocks'
import { UsersRepositoryMemory } from '@/infra/authentication/repositories/users/memory'
import { SessionsRepositoryMemory } from '@/infra/authentication/repositories/sessions/memory'
import { ConfigSetup, ConfigDTO } from '@/main/config/environment'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/session/refresh'
let accessToken: AccessTokenModel
let config: ConfigDTO
let server: http.Server
let agent: SuperAgentTest

describe('POST /session/refresh - Refresh Access Token', () => {
  beforeAll(async (done) => {
    config = ConfigSetup()
    UsersRepositoryMemory.getRepository().entities = []
    const password = faker.internet.password()
    await mockCreateUser(password)
    SessionsRepositoryMemory.getRepository().entities = []
    accessToken = await mockCreateAccessToken(mockUserTypeModel(), config.criptography.privateKey)
    server = app.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    return server && server.close(done)
  })

  test('Should return Ok status code if succeeds', async () => {
    await agent
      .post(url)
      .set('token', accessToken.access_token)
      .expect(HttpStatusCode.ok)
  })

  test('Should return forbidden status code if token is not provide', async () => {
    await agent
      .post(url)
      .expect(HttpStatusCode.forbidden)
  })

  test('Should return unprocessableEntity status code if token is invalid', async () => {
    await agent
      .post(url)
      .set('token', faker.datatype.uuid())
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
