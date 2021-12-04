import { DbLogoutUseCase } from './db-logout-use-case'
import { SessionModel } from '@/domain/authentication'
import { DeleteEntityByIdRepositorySpy } from '@/data/common/mocks'
import faker from 'faker'

type sutTypes = {
  sut: DbLogoutUseCase
  deleteSessionByIdRepository: DeleteEntityByIdRepositorySpy<SessionModel>
}

const makeSut = (): sutTypes => {
  const deleteSessionByIdRepository = new DeleteEntityByIdRepositorySpy<SessionModel>()
  const sut = new DbLogoutUseCase(deleteSessionByIdRepository)
  return {
    sut,
    deleteSessionByIdRepository
  }
}

describe('DbLogoutUseCase', () => {
  test('Should call DeleteSessionByIdRepository with correct value', async () => {
    const { sut, deleteSessionByIdRepository } = makeSut()
    const sessionId = faker.datatype.uuid()
    await sut.logout(sessionId)
    expect(deleteSessionByIdRepository.entityId).toBe(sessionId)
  })
})
