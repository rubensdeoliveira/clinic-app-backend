import { ListUserTypesUseCase } from '@/domain/authentication'
import { DbListUserTypeUseCase } from '@/data/authentication/use-cases'

export const makeListUserTypeUseCase = (): ListUserTypesUseCase => {
  return new DbListUserTypeUseCase()
}
