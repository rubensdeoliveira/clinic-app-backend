import { LoginUseCase } from '@/domain/authentication'
import { DbLoginUseCase } from '@/data/authentication/use-cases'
import { CommonUseCaseProps } from '@/infra/common/repositories'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { makeCreateAccessTokenUseCase, CreateAccessTokenUseCaseProps, makeCreateSessionUseCase } from '@/main/factories/authentication/use-cases'
import { makeCompareHash } from '@/main/factories/authentication/adapters'
import { GetUserByEmailRepository } from '@/data/authentication/repositories'

export type LoginCaseProps = CreateAccessTokenUseCaseProps & CommonUseCaseProps & {
  salt: number
}

export const makeLoginUseCase = ({ salt, accessTokenValidityInMinutes, refreshTokenValidityInMinutes, privateKey, ...props }: LoginCaseProps): LoginUseCase => {
  return new DbLoginUseCase(
    AuthRepositoryFactory.GetUsersRepository<GetUserByEmailRepository>(props.repositoryType),
    makeCompareHash(salt),
    makeCreateSessionUseCase(props),
    makeCreateAccessTokenUseCase({
      accessTokenValidityInMinutes,
      refreshTokenValidityInMinutes,
      privateKey
    })
  )
}
