import { SessionsRepositoryTypeORM } from './sessions.repository.typeorm'
import { mockSessionModel } from '@/domain/authentication'
import { TypeOrmRepositorySpy } from '@/infra/common/mocks'
import { SessionEntity } from '@/infra/authentication/repositories/sessions/typeorm'
import { getRepository } from 'typeorm'
import faker from 'faker'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: SessionsRepositoryTypeORM
}

const makeSut = (): sutTypes => {
  const sut = new SessionsRepositoryTypeORM()
  sut.repositoryTypeORM = getRepository<SessionEntity>(SessionEntity)
  return {
    sut
  }
}

describe('SessionRepositoryTypeORM', () => {
  describe('CreateRepositoryTypeORM Method', () => {
    test('Should return a new repository to entity', async () => {
      const { sut } = makeSut()
      const repository = sut.createRepositoryTypeORM()
      expect(repository).toEqual(sut.repositoryTypeORM)
    })
  })

  describe('DeleteByUserId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.deleteByUserId(faker.datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const accountId = faker.datatype.uuid()
      await sut.deleteByUserId(accountId)
      expect(deleteSpy).toHaveBeenCalledWith({
        account_id: accountId
      })
    })
  })

  describe('GetByUserId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.getByUserId(faker.datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call find with correct value', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
      const accountId = faker.datatype.uuid()
      await sut.getByUserId(accountId)
      expect(findSpy).toHaveBeenCalledWith({
        account_id: accountId
      })
    })

    test('Should return same find returns', async () => {
      const { sut } = makeSut()
      const session = mockSessionModel()
      jest.spyOn(sut.repositoryTypeORM, 'find').mockResolvedValueOnce([
        session,
        session,
        session
      ])
      const list = await sut.getByUserId(faker.datatype.uuid())
      expect(list).toEqual([
        session,
        session,
        session
      ])
    })
  })
})
