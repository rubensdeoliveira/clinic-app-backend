import {
  setupCreateSessionUseCase,
  CreateSessionUseCase,
} from '@/domain/authentication/use-cases'
import {
  makeBCryptHashGateway,
  makeDayjsDateGateway,
  makeJwtTokenGateway,
} from '@/main/factories/infra/authentication/gateways'
import {
  makeAccountsRepository,
  makeAccountTokensRepository,
} from '@/main/factories/infra/authentication/repositories/typeorm'

export const makeCreateSessionUseCase = (): CreateSessionUseCase => {
  return setupCreateSessionUseCase(
    makeAccountsRepository(),
    makeAccountTokensRepository(),
    makeDayjsDateGateway(),
    makeBCryptHashGateway(),
    makeJwtTokenGateway(),
    makeJwtTokenGateway(true),
  )
}
