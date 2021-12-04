import { RefreshAccessTokenController } from '@/presentation/authentication/controllers'
import { makeAccessTokenBodyRequestValidator } from '@/main/factories/authentication/request-validators'
import { makeCreateAccessTokenUseCase, CreateAccessTokenUseCaseProps } from '@/main/factories/authentication/use-cases'

export type RefreshAccessTokenControllerProps = CreateAccessTokenUseCaseProps

export const makeRefreshAccessTokenController = (props: RefreshAccessTokenControllerProps): RefreshAccessTokenController => {
  return new RefreshAccessTokenController(
    makeAccessTokenBodyRequestValidator(),
    makeCreateAccessTokenUseCase(props))
}
