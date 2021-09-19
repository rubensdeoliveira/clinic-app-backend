import { CommonRepositoryMemory } from './common-repository-memory'
import { mockEntityModel } from '@/domain/common/mocks'
import { EntityModel } from '@/domain/common/entities'

type sutTypes = {
  sut: CommonRepositoryMemory<EntityModel>
}

const makeSut = (): sutTypes => ({
  sut: new CommonRepositoryMemory<EntityModel>()
})

describe('CommonRepositoryMemory', () => {
  describe('Create Method', () => {
    test('Should return new entity with correct values', async () => {
      const { sut } = makeSut()
      const createdEntity = await sut.create(mockEntityModel())
      expect(createdEntity.id).toBeTruthy()
      expect(createdEntity.created_at).toBeTruthy()
      expect(createdEntity.updated_at).toBeTruthy()
    })
  })
})
