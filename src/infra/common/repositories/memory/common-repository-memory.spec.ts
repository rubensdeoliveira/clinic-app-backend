import { CommonRepositoryMemory } from './common-repository-memory'
import { EntityModel, mockEntityModel } from '@/domain/common'
import faker from 'faker'
import { mockListEntitiesRepositoryDTO } from '@/data/common/mocks'

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

  describe('GetById Method', () => {
    test('Should return undefined if entity is not found by id', async () => {
      const { sut } = makeSut()
      const entity = await sut.getById(faker.datatype.uuid())
      expect(entity).toBeFalsy()
    })

    test('Should return a entity with same provided id', async () => {
      const { sut } = makeSut()
      const mockedEntity = mockEntityModel()
      sut.entities.push(mockedEntity)
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      const Entity = await sut.getById(mockedEntity.id)
      expect(Entity).toEqual(mockedEntity)
    })
  })

  describe('DeleteById Method', () => {
    test('Should delete correct entity by id', async () => {
      const { sut } = makeSut()
      const mockedEntity = mockEntityModel()
      sut.entities.push(mockedEntity)
      expect(sut.entities).toHaveLength(1)
      await sut.deleteById(mockedEntity.id)
      expect(sut.entities).toHaveLength(0)
    })

    test('Should not delete entity if entity is not found by id', async () => {
      const { sut } = makeSut()
      expect(sut.entities).toHaveLength(0)
      await sut.deleteById(faker.datatype.uuid())
      expect(sut.entities).toHaveLength(0)
    })
  })

  describe('Update Method', () => {
    test('Should return a update Entity with correct values', async () => {
      const { sut } = makeSut()
      const request = mockEntityModel()
      sut.entities.push(mockEntityModel())
      sut.entities[0].id = request.id
      const updatedEntity = await sut.update(request)
      expect(updatedEntity.id).toBe(request.id)
    })

    test('Should return undefined if Entity is not found', async () => {
      const { sut } = makeSut()
      const updatedEntity = await sut.update(mockEntityModel())
      expect(updatedEntity).toBeFalsy()
    })
  })

  describe('List Method', () => {
    test('Should return a entity list if entity not found', async () => {
      const { sut } = makeSut()
      const entity = await sut.list(mockListEntitiesRepositoryDTO())
      expect(entity).toEqual([])
    })

    test('Should return a entity list with same name provided', async () => {
      const { sut } = makeSut()
      const mockedEntity = mockEntityModel()
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockedEntity)
      sut.entities.push(mockedEntity)
      const list = await sut.list({
        textToSearch: mockedEntity.id,
        skip: faker.datatype.number(),
        recordsPerPage: faker.datatype.number()
      })
      expect(list).toEqual([
        mockedEntity,
        mockedEntity
      ])
    })

    test('Should return a complete list if textToSearch is not provided', async () => {
      const { sut } = makeSut()
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      const list = await sut.list({
        skip: faker.datatype.number(),
        recordsPerPage: faker.datatype.number()
      })
      expect(list).toEqual(sut.entities)
    })
  })

  describe('Count Method', () => {
    test('Should return 0 if entity not found', async () => {
      const { sut } = makeSut()
      const count = await sut.count(faker.random.word())
      expect(count).toEqual(0)
    })

    test('Should return 2', async () => {
      const { sut } = makeSut()
      const mockedEntity = mockEntityModel()
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockedEntity)
      sut.entities.push(mockedEntity)
      const count = await sut.count(mockedEntity.id)
      expect(count).toBe(2)
    })

    test('Should return lenght of complete list if textToSearch is not provided', async () => {
      const { sut } = makeSut()
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      const count = await sut.count()
      expect(count).toBe(sut.entities.length)
    })
  })

  describe('List By List Ids Method', () => {
    test('Should return a entity list if entity not found', async () => {
      const { sut } = makeSut()
      const entity = await sut.listByListId([
        faker.datatype.uuid(),
        faker.datatype.uuid(),
        faker.datatype.uuid()
      ])
      expect(entity).toEqual([])
    })

    test('Should return a entity list with same id provided', async () => {
      const { sut } = makeSut()
      sut.entities = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      const list = await sut.listByListId([
        sut.entities[0].id,
        sut.entities[1].id,
        sut.entities[3].id
      ])
      expect(list).toEqual([
        sut.entities[0],
        sut.entities[1],
        sut.entities[3]
      ])
    })
  })

  describe('Create In Bulk Method', () => {
    test('Should call Create Method for each items', async () => {
      const { sut } = makeSut()
      const paramsItems = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      const createSpy = jest.spyOn(sut, 'create')
      await sut.createInBulk(paramsItems)
      paramsItems.forEach(item => {
        expect(createSpy).toHaveBeenCalledWith(item)
      })
    })

    test('Should return a list with same params length', async () => {
      const { sut } = makeSut()
      const paramsItems = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      const createdEntities = await sut.createInBulk(paramsItems)
      expect(createdEntities).toHaveLength(paramsItems.length)
    })
  })

  describe('DeleteByListId Method', () => {
    test('Should delete correct entity by list id', async () => {
      const { sut } = makeSut()
      sut.entities = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      const listIds: string[] = []
      sut.entities.forEach(entity => {
        listIds.push(entity.id)
      })
      await sut.deleteByListId(listIds)
      expect(sut.entities).toHaveLength(0)
    })
  })

  describe('List By List Field Value Method', () => {
    test('Should return a entity list if entity not found', async () => {
      const { sut } = makeSut()
      const entity = await sut.listByListFieldValue([
        faker.datatype.uuid(),
        faker.datatype.uuid(),
        faker.datatype.uuid()
      ], 'id')
      expect(entity).toEqual([])
    })

    test('Should return a entity list with same id provided', async () => {
      const { sut } = makeSut()
      sut.entities = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      const list = await sut.listByListFieldValue([
        sut.entities[0].id,
        sut.entities[1].id,
        sut.entities[3].id
      ], 'id')
      expect(list).toEqual([
        sut.entities[0],
        sut.entities[1],
        sut.entities[3]
      ])
    })
  })
})
