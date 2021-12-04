import { SessionModel, ValidateSessionByIdUseCase } from '@/domain/authentication'
import { DbValidateSessionByIdUseCase } from '@/data/authentication/use-cases'
import { CommonUseCaseProps } from '@/infra/common/repositories'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { GetEntityByIdRepository } from '@/data/common/repositories'

export type ValidateSessionByIdUseCaseProps = CommonUseCaseProps

export const makeValidateSessionByIdUseCase = ({ repositoryType }: ValidateSessionByIdUseCaseProps): ValidateSessionByIdUseCase => {
  return new DbValidateSessionByIdUseCase(
    AuthRepositoryFactory.GetSessionsRepository<GetEntityByIdRepository<SessionModel>>(repositoryType)
  )
}
