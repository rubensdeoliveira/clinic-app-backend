import { AuthenticatedRequestMiddleware } from '@/presentation/authentication/middlewares'
import { makeValidateSessionByIdUseCase } from '@/main/factories/authentication/use-cases'
import { makeAuthenticatedRequestValidator } from '@/main/factories/authentication/request-validators'
import { UserTypeModel } from '@/domain/authentication'
import { CommonUseCaseProps } from '@/infra/common/repositories'

export type AuthenticatedRequestMiddlewareProps = CommonUseCaseProps & {
  userTypesWithAccess?: UserTypeModel[]
}

export const makeAuthenticatedRequestMiddleware = ({ repositoryType, userTypesWithAccess = [] }: AuthenticatedRequestMiddlewareProps): AuthenticatedRequestMiddleware => {
  return new AuthenticatedRequestMiddleware(
    makeAuthenticatedRequestValidator(),
    makeValidateSessionByIdUseCase({
      repositoryType
    }),
    userTypesWithAccess)
}
