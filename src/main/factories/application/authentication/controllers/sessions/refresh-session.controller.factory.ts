import { makeRefreshSessionUseCase } from '@/main/factories/domain/authentication/use-cases'
import { RefreshSessionController } from '@/application/authentication/controllers'

export const makeRefreshSessionController = (): RefreshSessionController => {
  return new RefreshSessionController(makeRefreshSessionUseCase())
}
