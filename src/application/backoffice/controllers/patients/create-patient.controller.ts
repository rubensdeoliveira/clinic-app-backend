import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { CreatePatientUseCase } from '@/domain/backoffice/use-cases'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { CreatePatientContract } from '@/domain/backoffice/contracts'

type HttpRequest = CreatePatientContract.Input & { accountId: string }
type Model = Error | CreatePatientContract.Output

export class CreatePatientController extends Controller {
  constructor(private readonly createPatientUseCase: CreatePatientUseCase) {
    super()
  }

  async perform(data: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const patient = await this.createPatientUseCase(data)
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
