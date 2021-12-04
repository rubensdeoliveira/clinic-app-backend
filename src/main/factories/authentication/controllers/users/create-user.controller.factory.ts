import { CreateUserController } from '@/presentation/authentication/controllers'
import { makeCreateUserRequestValidator } from '@/main/factories/authentication/request-validators'
import { makeCreateUserUseCase, CreateUserUseCaseProps } from '@/main/factories/authentication/use-cases'

export type CreateUserControllerProps = CreateUserUseCaseProps

export const makeCreateUserController = (props: CreateUserControllerProps): CreateUserController => {
  return new CreateUserController(
    makeCreateUserRequestValidator(),
    makeCreateUserUseCase(props)
  )
}
