import { UserModel, UpdateEmailAndTypeUserByIdUseCase } from '@/domain/authentication'
import { DbUpdateEmailAndTypeUserByIdUseCase } from '@/data/authentication/use-cases'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { CommonUseCaseProps } from '@/infra/common/repositories'
import { GetUserByEmailRepository, DeleteSessionByIdRepository } from '@/data/authentication/repositories'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'

export type UpdateEmailAndTypeUserByIdUseCaseProps = CommonUseCaseProps

export const makeUpdateEmailAndTypeUserByIdUseCase = ({ repositoryType }: UpdateEmailAndTypeUserByIdUseCaseProps): UpdateEmailAndTypeUserByIdUseCase => {
  return new DbUpdateEmailAndTypeUserByIdUseCase(
    AuthRepositoryFactory.GetUsersRepository<GetUserByEmailRepository>(repositoryType),
    AuthRepositoryFactory.GetUsersRepository<GetEntityByIdRepository<UserModel>>(repositoryType),
    AuthRepositoryFactory.GetUsersRepository<UpdateEntityRepository<UserModel>>(repositoryType),
    AuthRepositoryFactory.GetSessionsRepository<DeleteSessionByIdRepository>(repositoryType)
  )
}
