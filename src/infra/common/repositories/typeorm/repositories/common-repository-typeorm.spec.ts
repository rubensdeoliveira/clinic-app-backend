import { CommonRepositoryTypeORM } from './common-repository-typeorm'
import { mockEntityModel } from '@/domain/common/mocks'
import { TypeOrmRepositorySpy } from '@/infra/common/mocks'
import { DefaultEntity } from '@/infra/common/repositories'
import { TypeORMConnection } from '@/infra/common/repositories/typeorm/connection'
import { InvalidForeignKeyError, MissingParamError, RepositoryError, RepositoryErrorType, ViolateUniqueKeyError } from '@/data/common/errors'
import { getRepository } from 'typeorm'
import { database, random } from 'faker'

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

    test('Should throws a MissingParamError if MissingParamError throws on create method', async () => {
      const { sut } = makeSut()
      const missingParamName = database.column()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => {
        throw new RepositoryError(RepositoryErrorType.NotNull, undefined, missingParamName)
      })
      const promise = sut.create(mockEntityModel())
      await expect(promise).rejects.toThrowError(MissingParamError)
    })

    test('Should throws a InvalidForeignKeyError if InvalidForeignKeyError throws on create method', async () => {
      const { sut } = makeSut()
      const foreignKeyName = database.column()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => {
        throw new RepositoryError(RepositoryErrorType.ForeignKey, foreignKeyName)
      })
      const promise = sut.create(mockEntityModel())
      await expect(promise).rejects.toThrowError(InvalidForeignKeyError)
    })

    test('Should throws a ViolateUniqueKeyError if ViolateUniqueKeyError throws on create method', async () => {
      const { sut } = makeSut()
      const uniqueKeyName = database.column()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => {
        throw new RepositoryError(RepositoryErrorType.UniqueKey, uniqueKeyName)
      })
      const promise = sut.create(mockEntityModel())
      await expect(promise).rejects.toThrowError(ViolateUniqueKeyError)
    })

    test('Should call ThrowCorrectError method with correct params', async () => {
      const { sut } = makeSut()
      const errorMessage = random.words()
      const throwCorrectErrorSpy = jest.spyOn(sut, 'throwCorrectError')
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => { throw new Error(errorMessage) })
      await sut.create(mockEntityModel())
      expect(throwCorrectErrorSpy).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })
})
