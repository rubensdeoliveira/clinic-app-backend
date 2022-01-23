import { makeRegisterAccountUseCase } from '@/main/factories/domain/authentication/use-cases'
import { RegisterAccountController } from '@/application/authentication/controllers'

export const makeRegisterAccountController = (): RegisterAccountController => {
  return new RegisterAccountController(makeRegisterAccountUseCase())
}
