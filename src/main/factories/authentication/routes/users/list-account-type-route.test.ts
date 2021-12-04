import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { AccountRepositoryMemory } from '@/infra/auth/repositories/account/memory'
import { SessionRepositoryMemory } from '@/infra/auth/repositories/session/memory'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/auth/account/types/'
let server: http.Server
let agent: SuperAgentTest
// let accessToken: AccessTokenModel

describe('Get /auth/account/types - List valid account types', () => {
  beforeAll(async (done) => {
    server = app.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    return server && server.close(done)
  })

  beforeEach(async () => {
    AccountRepositoryMemory.getRepository().entities = []
    SessionRepositoryMemory.getRepository().entities = []
    // accessToken = await mockCreateAccessToken(UserType.platformManager)
  })

  test.skip('Should return ok status code if succeeds to platform manager', async () => {
    // const response = await agent
    //   .get(url)
    //   .set('token', accessToken.access_token)
    //   .expect(HttpStatusCode.ok)
    // const list = response.body as UserType[]
    // expect(list).toEqual([
    //   UserType.institutionalAdministrator,
    //   UserType.platformManager
    // ])
  })

  test.skip('Should return ok status code if succeeds to institutional administrator', async () => {
    // accessToken = await mockCreateAccessToken(UserType.institutionalAdministrator)
    // const response = await agent
    //   .get(url)
    //   .set('token', accessToken.access_token)
    //   .expect(HttpStatusCode.ok)
    // const list = response.body as UserType[]
    // expect(list).toEqual([
    //   UserType.athlete,
    //   UserType.coach,
    //   UserType.institutionalAdministrator,
    //   UserType.responsible
    // ])
  })

  test('Should return forbidden status code if token is not provided', async () => {
    await agent
      .get(url)
      .expect(HttpStatusCode.forbidden)
  })

  test('Should return unprocessable entity status code if token is invalid', async () => {
    await agent
      .get(url)
      .set('token', faker.datatype.uuid())
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test.skip('Should return forbidden status code if user authenticated hasnt acceess', async () => {
    // accessToken = await mockCreateAccessToken(
    //   faker.random.arrayElement([
    //     UserType.athlete,
    //     UserType.coach,
    //     UserType.responsible
    //   ]))
    // await agent
    //   .get(url)
    //   .set('token', accessToken.access_token)
    //   .expect(HttpStatusCode.forbidden)
  })
})
