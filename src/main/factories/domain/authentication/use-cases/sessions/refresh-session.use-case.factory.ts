import {
  setupRefreshSessionUseCase,
  RefreshSessionUseCase,
} from '@/domain/authentication/use-cases'
import {
  makeDayjsDateGateway,
  makeJwtTokenGateway,
} from '@/main/factories/infra/authentication/gateways'
import { makeAccountTokensRepository } from '@/main/factories/infra/authentication/repositories/typeorm'

export const makeRefreshSessionUseCase = (): RefreshSessionUseCase => {
  return setupRefreshSessionUseCase(
    makeAccountTokensRepository(),
    makeDayjsDateGateway(),
    makeJwtTokenGateway(),
    makeJwtTokenGateway(true),
  )
}
