import { LogoutController } from '@/presentation/authentication/controllers'
import { makeAccessTokenBodyRequestValidator } from '@/main/factories/authentication/request-validators'
import { makeLogoutUseCase, LogoutUseCaseProps } from '@/main/factories/authentication/use-cases'

export type LogoutControllerProps = LogoutUseCaseProps

export const makeLogoutController = (props: LogoutControllerProps): LogoutController => {
  return new LogoutController(
    makeAccessTokenBodyRequestValidator(),
    makeLogoutUseCase(props))
}
