import {
  setupDeletePatientByIdUseCase,
  DeletePatientByIdUseCase,
} from '@/domain/backoffice/use-cases'
import { makeAccountsRepository } from '@/main/factories/infra/authentication/repositories/typeorm'
import { makePatientsRepository } from '@/main/factories/infra/backoffice/repositories/typeorm'

export const makeDeletePatientByIdUseCase = (): DeletePatientByIdUseCase => {
  return setupDeletePatientByIdUseCase(
    makePatientsRepository(),
    makeAccountsRepository(),
  )
}
