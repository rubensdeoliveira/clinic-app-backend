import { GetEntityByIdRepository, DeleteEntityByIdRepository, CreateEntityRepository } from '@/data/common/repositories'
import { DeleteSessionByUserIdRepository, GetSessionByUserIdRepository } from '@/data/authentication/repositories'
import { SessionModel } from '@/domain/authentication'
import { RepositoryType } from '@/infra/common/repositories'
import { SessionsRepositoryMemory } from './memory'
import { SessionsRepositoryTypeORM } from './typeorm'

export type SessionsRepositoryType =
CreateEntityRepository<SessionModel> |
DeleteEntityByIdRepository<SessionModel> |
GetEntityByIdRepository<SessionModel> |
DeleteSessionByUserIdRepository |
GetSessionByUserIdRepository

export const getSessionsRepository = (repositoryType: RepositoryType): SessionsRepositoryType => {
  switch (repositoryType) {
    case RepositoryType.Memory:
      return SessionsRepositoryMemory.getRepository()
    case RepositoryType.TypeOrm:
      return new SessionsRepositoryTypeORM()
  }
}
