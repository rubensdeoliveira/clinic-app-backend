import { DbGetEntityByIdUseCase } from './db-get-entity-by-id-use-case'
import { GetEntityByIdRepositorySpy } from '@/data/common/mocks'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { mockEntityModel } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: DbGetEntityByIdUseCase
  getEntityByIdRepository: GetEntityByIdRepositorySpy
}

const makeSut = (): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy()
  getEntityByIdRepository.entity = mockEntityModel()
  const sut = new DbGetEntityByIdUseCase(getEntityByIdRepository, faker.database.column())
  return {
    sut,
    getEntityByIdRepository
  }
}

describe('DbGetEntityByIdUseCase', () => {
  test('Should call GetEntityByIdRepository with correct value', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const entityId = faker.datatype.uuid()
    await sut.getById(entityId)
    expect(getEntityByIdRepository.entityId).toBe(entityId)
  })

  test('Should return EntityIsNotFoundError if GetEntityByIdRepository returns undefined', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    getEntityByIdRepository.entity = undefined
    const promise = sut.getById(faker.datatype.uuid())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should return same GetEntityByIdRepository returns', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const result = await sut.getById(faker.datatype.uuid())
    expect(result).toEqual(getEntityByIdRepository.entity)
  })
})
