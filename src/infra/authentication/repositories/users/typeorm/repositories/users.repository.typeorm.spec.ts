import { UsersRepositoryTypeORM } from './users.repository.typeorm'
import { mockUserModel } from '@/domain/authentication'
import { TypeOrmRepositorySpy } from '@/infra/common/mocks'
import { getRepository } from 'typeorm'
import { UserEntity } from '@/infra/authentication/repositories/users/typeorm'
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
  sut: UsersRepositoryTypeORM
}

const makeSut = (): sutTypes => {
  const sut = new UsersRepositoryTypeORM()
  sut.repositoryTypeORM = getRepository<UserEntity>(UserEntity)
  return {
    sut
  }
}

describe('UserRepositoryTypeORM', () => {
  describe('CreateRepositoryTypeORM Method', () => {
    test('Should return a new repository to entity', async () => {
      const { sut } = makeSut()
      const repository = sut.createRepositoryTypeORM()
      expect(repository).toEqual(sut.repositoryTypeORM)
    })
  })

  describe('GetByEmail Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.getByEmail(faker.internet.email())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const email = faker.internet.email()
      await sut.getByEmail(email)
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          email
        }
      })
    })

    test('Should return same FindOne return', async () => {
      const { sut } = makeSut()
      const account = mockUserModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const findUser = await sut.getByEmail(faker.internet.email())
      expect(findUser).toEqual(account)
    })
  })
})
