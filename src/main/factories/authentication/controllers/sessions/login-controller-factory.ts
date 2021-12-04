import { LoginController } from '@/presentation/authentication/controllers'
import { makeLoginRequestValidator } from '@/main/factories/authentication/request-validators'
import { makeLoginUseCase, LoginCaseProps } from '@/main/factories/authentication/use-cases'

export type LoginControllerProps = LoginCaseProps

export const makeLoginController = (props: LoginControllerProps): LoginController => {
  return new LoginController(
    makeLoginRequestValidator(),
    makeLoginUseCase(props)
  )
}
