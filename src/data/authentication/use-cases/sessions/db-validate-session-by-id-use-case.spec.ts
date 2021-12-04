import { DbValidateSessionByIdUseCase } from './db-validate-session-by-id-use-case'
import { GetEntityByIdRepositorySpy } from '@/data/common/mocks'
import { SessionNotFoundError } from '@/data/authentication/errors'
import { SessionModel } from '@/domain/authentication'
import faker from 'faker'

type sutTypes = {
  sut: DbValidateSessionByIdUseCase
  getSessionByIdRepository: GetEntityByIdRepositorySpy<SessionModel>
}

const makeSut = (): sutTypes => {
  const getSessionByIdRepository = new GetEntityByIdRepositorySpy<SessionModel>()
  const sut = new DbValidateSessionByIdUseCase(getSessionByIdRepository)
  return {
    sut,
    getSessionByIdRepository
  }
}

describe('DbValidateSessionByIdUseCase', () => {
  test('Should call GetSessionByIdRepository with correct value', async () => {
    const { sut, getSessionByIdRepository } = makeSut()
    const getByIdSpy = jest.spyOn(getSessionByIdRepository, 'getById')
    const sessionId = faker.datatype.uuid()
    await sut.validate(sessionId)
    expect(getByIdSpy).toHaveBeenCalledWith(sessionId)
  })

  test('Should return SessionNotFoundError if GetSessionByIdRepository return undefined', async () => {
    const { sut, getSessionByIdRepository } = makeSut()
    getSessionByIdRepository.entity = undefined
    const promise = sut.validate(faker.datatype.uuid())
    await expect(promise).rejects.toThrowError(SessionNotFoundError)
  })

  test('Should return same GetSessionByIdRepository return if return a session', async () => {
    const { sut, getSessionByIdRepository } = makeSut()
    const session = await sut.validate(faker.datatype.uuid())
    expect(session).toEqual(getSessionByIdRepository.entity)
  })
})
