import { UserModel, UserTypeModel, CreateUserUseCase } from '@/domain/authentication'
import { DbCreateUserUseCase } from '@/data/authentication/use-cases'
import { GetUserByEmailRepository } from '@/data/authentication/repositories'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { CommonUseCaseProps } from '@/infra/common/repositories'
import { makeCreateHash } from '@/main/factories/authentication/adapters'
import { CreateEntityRepository } from '@/data/common/repositories'

export type CreateUserUseCaseProps = CommonUseCaseProps & {
  salt: number
  userType?: UserTypeModel
}

export const makeCreateUserUseCase = ({ repositoryType, salt, userType = UserTypeModel.administrator }: CreateUserUseCaseProps): CreateUserUseCase => {
  return new DbCreateUserUseCase(
    AuthRepositoryFactory.GetUsersRepository<GetUserByEmailRepository>(repositoryType),
    makeCreateHash(salt),
    AuthRepositoryFactory.GetUsersRepository<CreateEntityRepository<UserModel>>(repositoryType),
    userType)
}
