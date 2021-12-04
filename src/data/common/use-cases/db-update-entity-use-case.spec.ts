import { DbUpdateEntityUseCase } from './db-update-entity-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { UpdateEntityRepositorySpy, GetEntityByIdRepositorySpy } from '@/data/common/mocks'
import { EntityIsNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbUpdateEntityUseCase<EntityModel>
  getEntityByIdRepository: GetEntityByIdRepositorySpy<EntityModel>
  updateEntityRepository: UpdateEntityRepositorySpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy<EntityModel>()
  getEntityByIdRepository.entity = mockEntityModel()
  const updateEntityRepository = new UpdateEntityRepositorySpy<EntityModel>()
  const sut = new DbUpdateEntityUseCase<EntityModel>(getEntityByIdRepository, updateEntityRepository, faker.database.column())
  return {
    sut,
    getEntityByIdRepository,
    updateEntityRepository
  }
}

describe('DbUpdateEntityUseCase', () => {
  test('Should call GetEntityByIdRepository with correct value', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const request = mockEntityModel()
    await sut.update(request.id, request)
    expect(getEntityByIdRepository.entityId).toBe(request.id)
  })

  test('Should return EntityIsNotFoundError if GetEntityByIdRepository return undefined', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    delete getEntityByIdRepository.entity
    const request = mockEntityModel()
    const promise = sut.update(request.id, request)
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should call UpdateEntityRepository with correct value', async () => {
    const { sut, getEntityByIdRepository, updateEntityRepository } = makeSut()
    const request = mockEntityModel()
    await sut.update(request.id, request)
    expect(updateEntityRepository.params).toEqual({
      ...request,
      id: getEntityByIdRepository.entity.id
    })
  })

  test('Should return same UpdateEntityRepository returns', async () => {
    const { sut, updateEntityRepository } = makeSut()
    const request = mockEntityModel()
    const result = await sut.update(request.id, request)
    expect(result).toEqual(updateEntityRepository.entity)
  })
})
