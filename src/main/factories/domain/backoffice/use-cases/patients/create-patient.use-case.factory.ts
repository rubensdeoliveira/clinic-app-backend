import {
  setupCreatePatientUseCase,
  CreatePatientUseCase,
} from '@/domain/backoffice/use-cases'
import { makeAccountsRepository } from '@/main/factories/infra/authentication/repositories/typeorm'
import { makePatientsRepository } from '@/main/factories/infra/backoffice/repositories/typeorm'

export const makeCreatePatientUseCase = (): CreatePatientUseCase => {
  return setupCreatePatientUseCase(
    makePatientsRepository(),
    makeAccountsRepository(),
  )
}
