import {
  setupUpdatePatientByIdUseCase,
  UpdatePatientByIdUseCase,
} from '@/domain/backoffice/use-cases'
import { makeAccountsRepository } from '@/main/factories/infra/authentication/repositories/typeorm'
import { makePatientsRepository } from '@/main/factories/infra/backoffice/repositories/typeorm'

export const makeUpdatePatientByIdUseCase = (): UpdatePatientByIdUseCase => {
  return setupUpdatePatientByIdUseCase(
    makePatientsRepository(),
    makeAccountsRepository(),
  )
}
