import { makeCreateSessionUseCase } from '@/main/factories/domain/authentication/use-cases'
import { CreateSessionController } from '@/application/authentication/controllers'

export const makeCreateSessionController = (): CreateSessionController => {
  return new CreateSessionController(makeCreateSessionUseCase())
}
