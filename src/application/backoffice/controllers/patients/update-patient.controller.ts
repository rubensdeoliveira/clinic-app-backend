import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { UpdatePatientByIdUseCase } from '@/domain/backoffice/use-cases'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { UpdatePatientByIdContract } from '@/domain/backoffice/contracts'

type HttpRequest = UpdatePatientByIdContract.Input & {
  accountId: string
}
type Model = Error | UpdatePatientByIdContract.Output

export class UpdatePatientController extends Controller {
  constructor(
    private readonly updatePatientByIdUseCase: UpdatePatientByIdUseCase,
  ) {
    super()
  }

  async perform(data: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const patient = await this.updatePatientByIdUseCase(data)
      return ok(patient)
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
