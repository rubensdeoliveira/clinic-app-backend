import { CommonRepositoryTypeORM } from './common-repository-typeorm'
import { mockEntityModel } from '@/domain/common'
import { TypeOrmRepositorySpy } from '@/infra/common/mocks'
import { DefaultEntity } from '@/infra/common/repositories'
import { getRepository, JoinOptions, In } from 'typeorm'
import { mockListEntitiesRepositoryDTO } from '@/data/common/mocks'
import { TypeORMConnection } from '@/infra/common/repositories/typeorm/connection'
import faker from 'faker'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  ManyToMany: () => {},
  JoinTable: () => {},
  OneToMany: () => {},
  ManyToOne: () => {},
  JoinColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  In: () => {},
  Like: () => {},
  ILike: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: CommonRepositoryTypeORM<DefaultEntity>
}

const makeSut = (): sutTypes => {
  const sut = new CommonRepositoryTypeORM<DefaultEntity>()
  jest.spyOn(TypeORMConnection, 'getConnection').mockImplementation(jest.fn())
  sut.repositoryTypeORM = getRepository<DefaultEntity>(DefaultEntity)
  return {
    sut
  }
}

describe('CommonRepositoryTypeORM', () => {
  describe('GetRepositoryTypeORM Method', () => {
    test('Should not call GetConnection is repositoryTypeORM is provided', async () => {
      const { sut } = makeSut()
      const getConnectionSpy = jest.spyOn(TypeORMConnection, 'getConnection')
      await sut.getRepositoryTypeORM()
      expect(getConnectionSpy).not.toHaveBeenCalled()
    })

    test('Should call GetConnection is repositoryTypeORM is not provided', async () => {
      const { sut } = makeSut()
      delete sut.repositoryTypeORM
      const getConnectionSpy = jest.spyOn(TypeORMConnection, 'getConnection')
      await sut.getRepositoryTypeORM()
      expect(getConnectionSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('CreateRepositoryTypeORM Method', () => {
    test('Should return undefined', () => {
      const { sut } = makeSut()
      const repository = sut.createRepositoryTypeORM()
      expect(repository).toBeFalsy()
    })
  })

  describe('Create Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.create(mockEntityModel())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Create with correct values', async () => {
      const { sut } = makeSut()
      const createSpy = jest.spyOn(sut.repositoryTypeORM, 'create')
      const request = mockEntityModel()
      await sut.create(request)
      expect(createSpy).toHaveBeenCalledWith(request)
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.create(entity)
      expect(saveSpy).toHaveBeenCalledWith(entity)
    })

    test('Should return a new entity if succeeds', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const createdEntity = await sut.create(entity)
      expect(createdEntity).toEqual(entity)
    })
  })

  describe('GetById Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.getById(faker.datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const entityId = faker.datatype.uuid()
      await sut.getById(entityId)
      expect(findOneSpy).toHaveBeenCalledWith(entityId, {
        join: sut.join
      })
    })

    test('Should return same FindOne return', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(entity as DefaultEntity)
      const findEntity = await sut.getById(entity.id)
      expect(findEntity).toEqual(entity)
    })
  })

  describe('DeleteById Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.deleteById(faker.datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const entityId = faker.datatype.uuid()
      await sut.deleteById(entityId)
      expect(deleteSpy).toHaveBeenCalledWith(entityId)
    })
  })

  describe('Update Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.update(mockEntityModel())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const request = mockEntityModel()
      await sut.update(request)
      expect(findOneSpy).toHaveBeenCalledWith(request.id)
    })

    test('Should return undefined if account is not found', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockImplementationOnce(() => { return undefined })
      const updatedAccount = await sut.update(mockEntityModel())
      expect(updatedAccount).toBeFalsy()
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.update(request)
      expect(saveSpy).toHaveBeenCalledWith({
        ...account,
        ...request
      })
    })

    test('Should return a updated account if succeeds', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const updatedAccount = await sut.update(request)
      expect(updatedAccount).toEqual({
        ...account,
        ...request
      })
    })
  })

  describe('GetSearchConditional Method', () => {
    test('Should return undefined if textToSeach is undefined', async () => {
      const { sut } = makeSut()
      const conditional = sut.getSearchConditional(undefined)
      expect(conditional).toBeFalsy()
    })

    test('Should return correct filter if textToSearch is provided', async () => {
      const { sut } = makeSut()
      sut.columnsToFilter = [
        faker.database.column(),
        faker.database.column(),
        faker.database.column(),
        faker.database.column(),
        faker.database.column()
      ]
      const textToSearch = faker.datatype.uuid()
      const conditional = sut.getSearchConditional(textToSearch)
      const where = sut.columnsToFilter.reduce((where, column): string => {
        if (where) {
          return `${where} OR (${column}::text ilike '%${textToSearch}%')`
        }
        return `(${column}::text ilike '%${textToSearch}%')`
      }, '')
      expect(conditional).toBe(where)
    })
  })

  describe('GetWhere Method', () => {
    test('Should call GetSearchConditional with correct value', () => {
      const { sut } = makeSut()
      const getSearchConditionalSpy = jest.spyOn(sut, 'getSearchConditional')
      const textToSeach = faker.datatype.uuid()
      sut.getWhere(textToSeach)
      expect(getSearchConditionalSpy).toBeCalledWith(textToSeach)
    })

    test('Should correct where if only GetSearchConditional return value', () => {
      const { sut } = makeSut()
      const searchConditional = faker.datatype.uuid()
      jest.spyOn(sut, 'getSearchConditional').mockReturnValueOnce(searchConditional)
      const where = sut.getWhere(faker.datatype.uuid())
      expect(where).toBe(searchConditional)
    })
  })

  describe('Count Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.count(faker.datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call GetWhere with correct values', async () => {
      const { sut } = makeSut()
      const getWhereSpy = jest.spyOn(sut, 'getWhere')
      const textToSeach = faker.datatype.uuid()
      await sut.count(textToSeach)
      expect(getWhereSpy).toHaveBeenCalledWith(textToSeach)
    })

    test('Should call Count with correct value if join is defined', async () => {
      const { sut } = makeSut()
      sut.join = faker.random.objectElement<JoinOptions>()
      const where = faker.datatype.uuid()
      jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
      const countSpy = jest.spyOn(sut.repositoryTypeORM, 'count')
      await sut.count(faker.datatype.uuid())
      expect(countSpy).toHaveBeenCalledWith({
        where,
        join: sut.join
      })
    })

    test('Should call Count with correct value if join is defined', async () => {
      const { sut } = makeSut()
      const where = faker.datatype.uuid()
      jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
      const countSpy = jest.spyOn(sut.repositoryTypeORM, 'count')
      await sut.count(faker.datatype.uuid())
      expect(countSpy).toHaveBeenCalledWith({
        where
      })
    })

    test('Should call Find with correct value without textToSearch', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'count')
      await sut.count()
      expect(findSpy).toHaveBeenCalledWith({
        where: undefined
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const count = faker.datatype.number()
      jest.spyOn(sut.repositoryTypeORM, 'count').mockResolvedValue(count)
      const recordCount = await sut.count(faker.random.word())
      expect(recordCount).toBe(count)
    })
  })

  describe('List Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.list(mockListEntitiesRepositoryDTO())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call GetWhere with correct values', async () => {
      const { sut } = makeSut()
      const getWhereSpy = jest.spyOn(sut, 'getWhere')
      const request = mockListEntitiesRepositoryDTO()
      await sut.list(request)
      expect(getWhereSpy).toHaveBeenCalledWith(request.filters, request.textToSearch)
    })

    describe('Order', () => {
      test('Should call Find with correct value if order is not provided', async () => {
        const { sut } = makeSut()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        delete request.orderColumn
        await sut.list(request)
        const { skip, recordsPerPage } = request
        expect(findSpy).toHaveBeenCalledWith({
          where,
          skip,
          take: recordsPerPage
        })
      })

      test('Should call Find with correct value if order is provided', async () => {
        const { sut } = makeSut()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        const { skip, recordsPerPage, orderColumn, orderDirection } = request
        expect(findSpy).toHaveBeenCalledWith({
          where,
          skip,
          take: recordsPerPage,
          order: {
            [orderColumn]: orderDirection
          }
        })
      })
    })

    describe('Order Direction', () => {
      test('Should call Find with correct value if order direction is not provided', async () => {
        const { sut } = makeSut()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        delete request.orderDirection
        await sut.list(request)
        const { skip, recordsPerPage } = request
        expect(findSpy).toHaveBeenCalledWith({
          where,
          skip,
          take: recordsPerPage

        })
      })

      test('Should call Find with correct value if order direction is provided', async () => {
        const { sut } = makeSut()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        const { skip, recordsPerPage, orderColumn, orderDirection } = request
        expect(findSpy).toHaveBeenCalledWith({
          where,
          skip,
          take: recordsPerPage,
          order: {
            [orderColumn]: orderDirection
          }
        })
      })
    })

    describe('Join', () => {
      test('Should call Find with correct value if join is provided', async () => {
        const { sut } = makeSut()
        sut.join = faker.random.objectElement<JoinOptions>()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        const { skip, recordsPerPage, orderColumn, orderDirection } = request
        expect(findSpy).toHaveBeenCalledWith({
          join: sut.join,
          where,
          skip,
          take: recordsPerPage,
          order: {
            [orderColumn]: orderDirection
          }
        })
      })

      test('Should call Find with correct value if join is not provided', async () => {
        const { sut } = makeSut()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        const { skip, recordsPerPage, orderColumn, orderDirection } = request
        expect(findSpy).toHaveBeenCalledWith({
          where,
          skip,
          take: recordsPerPage,
          order: {
            [orderColumn]: orderDirection
          }
        })
      })
    })

    describe('Where', () => {
      test('Should call Find with correct value if GetWhere return a value', async () => {
        const { sut } = makeSut()
        sut.join = faker.random.objectElement<JoinOptions>()
        const where = faker.datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        const { skip, recordsPerPage, orderColumn, orderDirection } = request
        expect(findSpy).toHaveBeenCalledWith({
          join: sut.join,
          where,
          skip,
          take: recordsPerPage,
          order: {
            [orderColumn]: orderDirection
          }
        })
      })

      test('Should call Find with correct value if GetWhere return undefined', async () => {
        const { sut } = makeSut()
        sut.join = faker.random.objectElement<JoinOptions>()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(undefined)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        const { skip, recordsPerPage, orderColumn, orderDirection } = request
        expect(findSpy).toHaveBeenCalledWith({
          join: sut.join,
          skip,
          take: recordsPerPage,
          order: {
            [orderColumn]: orderDirection
          }
        })
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'find').mockResolvedValue([entity, entity])
      const findEntity = await sut.list(mockListEntitiesRepositoryDTO())
      expect(findEntity).toEqual([entity, entity])
    })
  })

  describe('ListByListId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.listByListId([])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Find with correct value', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
      const listIds = [
        faker.datatype.uuid(),
        faker.datatype.uuid(),
        faker.datatype.uuid()
      ]
      await sut.listByListId(listIds)
      expect(findSpy).toHaveBeenCalledWith({
        join: sut.join,
        where: {
          id: In(listIds)
        }
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const entities = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      jest.spyOn(sut.repositoryTypeORM, 'find').mockResolvedValue(entities)
      const list = await sut.listByListId([])
      expect(list).toEqual(entities)
    })
  })

  describe('CreateInBulk Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.createInBulk([mockEntityModel()])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Create with correct values for each params items', async () => {
      const { sut } = makeSut()
      const createSpy = jest.spyOn(sut.repositoryTypeORM, 'create')
      const paramsList = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      await sut.createInBulk(paramsList)
      paramsList.forEach(param => {
        expect(createSpy).toHaveBeenCalledWith(param)
      })
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.createInBulk([mockEntityModel()])
      expect(saveSpy).toHaveBeenCalledWith([entity])
    })

    test('Should return a new entity if succeeds', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const createdEntity = await sut.createInBulk([mockEntityModel()])
      expect(createdEntity).toEqual([entity])
    })
  })

  describe('DeleteByListId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.deleteByListId([faker.datatype.uuid()])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const entityIdList = [
        faker.datatype.uuid(),
        faker.datatype.uuid(),
        faker.datatype.uuid()
      ]
      await sut.deleteByListId(entityIdList)
      expect(deleteSpy).toHaveBeenCalledWith(entityIdList)
    })
  })

  describe('ListByListFieldName Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.listByListFieldValue([faker.datatype.uuid()], 'id')
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Find with correct value', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
      const listIds = [
        faker.datatype.uuid(),
        faker.datatype.uuid(),
        faker.datatype.uuid()
      ]
      await sut.listByListFieldValue(listIds, 'id')
      expect(findSpy).toHaveBeenCalledWith({
        join: sut.join,
        where: {
          id: In(listIds)
        }
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const entities = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      jest.spyOn(sut.repositoryTypeORM, 'find').mockResolvedValue(entities)
      const list = await sut.listByListFieldValue([], 'id')
      expect(list).toEqual(entities)
    })
  })
})
