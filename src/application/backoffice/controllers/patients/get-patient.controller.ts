import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { GetPatientByIdUseCase } from '@/domain/backoffice/use-cases'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { GetPatientByIdContract } from '@/domain/backoffice/contracts'

type HttpRequest = GetPatientByIdContract.Input & {
  accountId: string
}
type Model = Error | GetPatientByIdContract.Output

export class GetPatientController extends Controller {
  constructor(private readonly getPatientByIdUseCase: GetPatientByIdUseCase) {
    super()
  }

  async perform(data: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const patient = await this.getPatientByIdUseCase(data)
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
