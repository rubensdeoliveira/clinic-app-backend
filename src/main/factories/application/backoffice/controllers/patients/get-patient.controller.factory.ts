import { makeGetPatientByIdUseCase } from '@/main/factories/domain/backoffice/use-cases'
import { GetPatientController } from '@/application/backoffice/controllers'

export const makeGetPatientController = (): GetPatientController => {
  return new GetPatientController(makeGetPatientByIdUseCase())
}
