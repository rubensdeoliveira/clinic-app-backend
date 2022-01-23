import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { ListPatientsUseCase } from '@/domain/backoffice/use-cases'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { ListPatientsContract } from '@/domain/backoffice/contracts'

type HttpRequest = ListPatientsContract.Input & { accountId: string }
type Model = Error | ListPatientsContract.Output

export class ListPatientsController extends Controller {
  constructor(private readonly listPatientsUseCase: ListPatientsUseCase) {
    super()
  }

  async perform(data: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const patients = await this.listPatientsUseCase(data)
      return ok(patients)
    } catch (error) {
      if (error instanceof PatientEmailInUseError) {
        return badRequest(new PatientEmailInUseError())
      }
      if (error instanceof PatientCpfInUseError) {
        return badRequest(new PatientCpfInUseError())
      }
      throw error
    }
  }
}
