import {
  GetUserByEmailRepository
} from '@/data/authentication/repositories'
import { UserModel } from '@/domain/authentication'
import { RepositoryType, CommonRepositoryType } from '@/infra/common/repositories'
import { UsersRepositoryMemory } from './memory'
import { UsersRepositoryTypeORM } from './typeorm'

export type UsersRepositoryType =
CommonRepositoryType<UserModel> |
GetUserByEmailRepository

export const getUsersRepository = (repositoryType: RepositoryType): UsersRepositoryType => {
  switch (repositoryType) {
    case RepositoryType.Memory:
      return UsersRepositoryMemory.getRepository()
    case RepositoryType.TypeOrm:
      return new UsersRepositoryTypeORM()
  }
}
