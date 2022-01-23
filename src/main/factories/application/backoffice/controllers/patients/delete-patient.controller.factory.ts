import { makeDeletePatientByIdUseCase } from '@/main/factories/domain/backoffice/use-cases'
import { DeletePatientController } from '@/application/backoffice/controllers'

export const makeDeletePatientController = (): DeletePatientController => {
  return new DeletePatientController(makeDeletePatientByIdUseCase())
}
