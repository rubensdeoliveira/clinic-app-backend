import { makeListPatientsUseCase } from '@/main/factories/domain/backoffice/use-cases'
import { ListPatientsController } from '@/application/backoffice/controllers'

export const makeListPatientsController = (): ListPatientsController => {
  return new ListPatientsController(makeListPatientsUseCase())
}
