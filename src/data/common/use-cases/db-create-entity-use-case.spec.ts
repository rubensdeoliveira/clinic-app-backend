import { DbCreateEntityUseCase } from './db-create-entity-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { CreateEntityRepositorySpy } from '@/data/common/mocks'
import { EntityAlreadyExistsError } from '@/data/common/errors'

type sutTypes = {
  sut: DbCreateEntityUseCase<EntityModel>
  createEntityRepository: CreateEntityRepositorySpy
}

const makeSut = (): sutTypes => {
  const createEntityRepository = new CreateEntityRepositorySpy()
  const sut = new DbCreateEntityUseCase<EntityModel>(createEntityRepository, 'entity')
  return {
    sut,
    createEntityRepository
  }
}

describe('DbCreateEntityUseCase', () => {
  test('Should call CreateEntityRepository with correct value', async () => {
    const { sut, createEntityRepository } = makeSut()
    const request = mockEntityModel()
    await sut.create(request)
    expect(createEntityRepository.params).toEqual(request)
  })

  test('Should return EntityAlreadyExistsError if CreateEntityRepository fails', async () => {
    const { sut, createEntityRepository } = makeSut()
    jest.spyOn(createEntityRepository, 'create').mockRejectedValueOnce(new Error())
    const promise = sut.create(mockEntityModel())
    await expect(promise).rejects.toThrowError(EntityAlreadyExistsError)
  })

  test('Should return same CreateEntityRepository returns', async () => {
    const { sut, createEntityRepository } = makeSut()
    const result = await sut.create(mockEntityModel())
    expect(result).toEqual(createEntityRepository.entity)
  })
})
