import {
  setupRegisterAccountUseCase,
  RegisterAccountUseCase,
} from '@/domain/authentication/use-cases'
import { makeBCryptHashGateway } from '@/main/factories/infra/authentication/gateways'
import { makeAccountsRepository } from '@/main/factories/infra/authentication/repositories/typeorm'

export const makeRegisterAccountUseCase = (): RegisterAccountUseCase => {
  return setupRegisterAccountUseCase(
    makeAccountsRepository(),
    makeBCryptHashGateway(),
  )
}
