import { makeCreatePatientUseCase } from '@/main/factories/domain/backoffice/use-cases'
import { CreatePatientController } from '@/application/backoffice/controllers'

export const makeCreatePatientController = (): CreatePatientController => {
  return new CreatePatientController(makeCreatePatientUseCase())
}
