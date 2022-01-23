import { makeUpdatePatientByIdUseCase } from '@/main/factories/domain/backoffice/use-cases'
import { UpdatePatientController } from '@/application/backoffice/controllers'

export const makeUpdatePatientController = (): UpdatePatientController => {
  return new UpdatePatientController(makeUpdatePatientByIdUseCase())
}
