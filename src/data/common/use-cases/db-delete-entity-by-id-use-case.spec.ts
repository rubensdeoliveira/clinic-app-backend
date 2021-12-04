import { DbDeleteEntityByIdUseCase } from './db-delete-entity-by-id-use-case'
import { EntityModel } from '@/domain/common'
import { DeleteEntityByIdRepositorySpy } from '@/data/common/mocks'
import faker from 'faker'

type sutTypes = {
  sut: DbDeleteEntityByIdUseCase<EntityModel>
  deleteEntityByIdRepository: DeleteEntityByIdRepositorySpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const deleteEntityByIdRepository = new DeleteEntityByIdRepositorySpy<EntityModel>()
  const sut = new DbDeleteEntityByIdUseCase<EntityModel>(deleteEntityByIdRepository)
  return {
    sut,
    deleteEntityByIdRepository
  }
}

describe('DbDeleteEntityByIdUseCase', () => {
  test('Should call DeleteEntityByIdRepository with correct value', async () => {
    const { sut, deleteEntityByIdRepository } = makeSut()
    const entityId = faker.datatype.uuid()
    await sut.deleteById(entityId)
    expect(deleteEntityByIdRepository.entityId).toBe(entityId)
  })

  test('Should return void if DeleteEntityByIdRepository is succeeds', async () => {
    const { sut } = makeSut()
    await sut.deleteById(faker.datatype.uuid())
  })
})
