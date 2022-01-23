import {
  setupListPatientsUseCase,
  ListPatientsUseCase,
} from '@/domain/backoffice/use-cases'
import { makeAccountsRepository } from '@/main/factories/infra/authentication/repositories/typeorm'
import { makePatientsRepository } from '@/main/factories/infra/backoffice/repositories/typeorm'

export const makeListPatientsUseCase = (): ListPatientsUseCase => {
  return setupListPatientsUseCase(
    makePatientsRepository(),
    makeAccountsRepository(),
  )
}
