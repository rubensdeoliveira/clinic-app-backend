import { LogoutUseCase, SessionModel } from '@/domain/authentication'
import { DbLogoutUseCase } from '@/data/authentication/use-cases'
import { CommonUseCaseProps } from '@/infra/common/repositories'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { DeleteEntityByIdRepository } from '@/data/common/repositories'

export type LogoutUseCaseProps = CommonUseCaseProps

export const makeLogoutUseCase = ({ repositoryType }: LogoutUseCaseProps): LogoutUseCase => {
  return new DbLogoutUseCase(
    AuthRepositoryFactory.GetSessionsRepository<DeleteEntityByIdRepository<SessionModel>>(repositoryType)
  )
}
