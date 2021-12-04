import { SessionsRepositoryMemory } from './sessions.repository.memory'
import faker from 'faker'
import { mockUserModel, mockSessionModel } from '@/domain/authentication'

type sutTypes = {
  sut: SessionsRepositoryMemory
}

const makeSut = (): sutTypes => ({
  sut: SessionsRepositoryMemory.getRepository()
})

describe('SessionsRepositoryMemory', () => {
  beforeEach(() => {
    SessionsRepositoryMemory.getRepository().entities = []
  })

  describe('Create Method', () => {
    test('Should return new session with correct values', async () => {
      const { sut } = makeSut()
      const userId = faker.datatype.uuid()
      const createdSession = await sut.create({
        user_id: userId
      })
      expect(createdSession.id).toBeTruthy()
      expect(createdSession.created_at).toBeTruthy()
      expect(createdSession.user_id).toBe(userId)
    })
  })

  describe('DeleteById Method', () => {
    test('Should remove correct session', async () => {
      const { sut } = makeSut()
      const createdSession = await sut.create({
        user_id: faker.datatype.uuid()
      })
      expect(SessionsRepositoryMemory.getRepository().entities[0].id).toBe(createdSession.id)
      await sut.deleteById(createdSession.id)
      expect(SessionsRepositoryMemory.getRepository().entities).toHaveLength(0)
    })
  })

  describe('DeleteByUserId Method', () => {
    test('Should remove all sessions with same account id provided', async () => {
      const account = mockUserModel()
      SessionsRepositoryMemory.getRepository().entities = [
        mockSessionModel(),
        mockSessionModel(),
        mockSessionModel(),
        mockSessionModel(),
        mockSessionModel()
      ]
      SessionsRepositoryMemory.getRepository().entities[0].user_id = account.id
      SessionsRepositoryMemory.getRepository().entities[2].user_id = account.id
      SessionsRepositoryMemory.getRepository().entities[4].user_id = account.id
      expect(SessionsRepositoryMemory.getRepository().entities).toHaveLength(5)
      const { sut } = makeSut()
      await sut.deleteByUserId(account.id)
      expect(SessionsRepositoryMemory.getRepository().entities).toHaveLength(2)
    })
  })

  describe('GetByUserId Method', () => {
    test('Should return all sessions with same account id provided', async () => {
      const account = mockUserModel()
      SessionsRepositoryMemory.getRepository().entities = [
        mockSessionModel(),
        mockSessionModel(),
        mockSessionModel(),
        mockSessionModel(),
        mockSessionModel()
      ]
      SessionsRepositoryMemory.getRepository().entities[0].user_id = account.id
      SessionsRepositoryMemory.getRepository().entities[2].user_id = account.id
      SessionsRepositoryMemory.getRepository().entities[4].user_id = account.id
      expect(SessionsRepositoryMemory.getRepository().entities).toHaveLength(5)
      const { sut } = makeSut()
      const list = await sut.getByUserId(account.id)
      expect(list).toHaveLength(3)
    })
  })
})
