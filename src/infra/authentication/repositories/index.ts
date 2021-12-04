import { RepositoryType } from '@/infra/common/repositories'
import { getUsersRepository, UsersRepositoryType } from './users'
import { getSessionsRepository, SessionsRepositoryType } from './sessions'

export class AuthRepositoryFactory {
  public static GetUsersRepository<Type extends UsersRepositoryType> (repositoryType: RepositoryType): Type {
    return getUsersRepository(repositoryType) as Type
  }

  public static GetSessionsRepository<Type extends SessionsRepositoryType> (repositoryType: RepositoryType): Type {
    return getSessionsRepository(repositoryType) as Type
  }
}
