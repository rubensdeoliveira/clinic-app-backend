import { AccountRepositoryTypeOrm } from './account-repository-typeorm'
import { TypeOrmRepositorySpy } from '@/infra/common/mocks'
import { AccountEntity } from '@/infra/account/repositories/typeorm'
import { getRepository } from 'typeorm'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  ManyToMany: () => {},
  JoinTable: () => {},
  OneToMany: () => {},
  OneToOne: () => {},
  ManyToOne: () => {},
  JoinColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  Like: () => {},
  ILike: () => {},
  AfterLoad: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: AccountRepositoryTypeOrm
}

const makeSut = (): sutTypes => {
  const sut = new AccountRepositoryTypeOrm()
  sut.repositoryTypeORM = getRepository<AccountEntity>(AccountEntity)
  return {
    sut
  }
}

describe('AccountRepositoryTypeOrm', () => {
  describe('CreateRepositoryTypeORM Method', () => {
    test('Should return a new repository to entity', async () => {
      const { sut } = makeSut()
      const repository = sut.createRepositoryTypeORM()
      expect(repository).toEqual(sut.repositoryTypeORM)
    })
  })
})
