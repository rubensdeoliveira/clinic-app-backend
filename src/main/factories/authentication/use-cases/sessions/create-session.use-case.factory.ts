import { CreateSessionUseCase, SessionModel } from '@/domain/authentication'
import { DbCreateSessionUseCase } from '@/data/authentication/use-cases'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { CommonUseCaseProps } from '@/infra/common/repositories'
import { CreateEntityRepository } from '@/data/common/repositories'

export type CreateSessionUseCaseProps = CommonUseCaseProps

export const makeCreateSessionUseCase = ({ repositoryType }: CreateSessionUseCaseProps): CreateSessionUseCase => {
  return new DbCreateSessionUseCase(
    AuthRepositoryFactory.GetSessionsRepository<CreateEntityRepository<SessionModel>>(repositoryType)
  )
}
