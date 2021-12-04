import { DbCreateSessionUseCase } from './db-create-session-use-case'
import { mockCreateSessionDTO, mockSessionModel, SessionModel } from '@/domain/authentication'
import { CreateEntityRepositorySpy } from '@/data/common/mocks'

type sutTypes = {
  sut: DbCreateSessionUseCase
  createSessionRepository: CreateEntityRepositorySpy<SessionModel>
}

const makeSut = (): sutTypes => {
  const createSessionRepository = new CreateEntityRepositorySpy<SessionModel>()
  const sut = new DbCreateSessionUseCase(createSessionRepository)
  return {
    sut,
    createSessionRepository
  }
}

describe('DbCreateSessionUseCase', () => {
  test('Should call CreateSessionRepository with correct value', async () => {
    const { sut, createSessionRepository } = makeSut()
    const request = mockCreateSessionDTO()
    await sut.create(request)
    expect(createSessionRepository.params).toEqual({
      account_id: request.accountId
    })
  })

  test('Should return a session with correct values', async () => {
    const { sut, createSessionRepository } = makeSut()
    const request = mockCreateSessionDTO()
    createSessionRepository.entity = mockSessionModel(request.accountId)
    const session = await sut.create(request)
    expect(session.id).toBeTruthy()
    expect(session.account_id).toBe(request.accountId)
  })
})
