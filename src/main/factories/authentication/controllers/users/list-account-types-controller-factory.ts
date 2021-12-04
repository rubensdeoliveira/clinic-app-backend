import { ListUserTypesController } from '@/presentation/authentication/controllers'
import { makeListUserTypeUseCase } from '@/main/factories/authentication/use-cases'
import { makeAccessTokenBodyRequestValidator } from '@/main/factories/authentication/request-validators'

export const makeListUserTypesController = (): ListUserTypesController => {
  return new ListUserTypesController(
    makeAccessTokenBodyRequestValidator(),
    makeListUserTypeUseCase()
  )
}
