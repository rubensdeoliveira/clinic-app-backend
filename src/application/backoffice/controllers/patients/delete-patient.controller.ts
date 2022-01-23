import { Controller } from '@/application/common/controllers'
import {
  HttpResponse,
  badRequest,
  noContent,
} from '@/application/common/helpers'
import {
  DeletePatientByIdUseCase,
  CheckAccountCanAccessPatientUseCase,
} from '@/domain/backoffice/use-cases'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { DeletePatientByIdContract } from '@/domain/backoffice/contracts'

type HttpRequest = DeletePatientByIdContract.Input & {
  accountId: string
}
type Model = Error

export class DeletePatientController extends Controller {
  constructor(
    private readonly deletePatientByIdUseCase: DeletePatientByIdUseCase,
    private readonly checkAccountCanAccessPatientUseCase: CheckAccountCanAccessPatientUseCase,
  ) {
    super()
  }

  async perform(data: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accountCanAccessPatient =
        await this.checkAccountCanAccessPatientUseCase({
          accountId: data.accountId,
          id: data.id,
        })
      if (accountCanAccessPatient) {
        await this.deletePatientByIdUseCase(data)
        return noContent()
      }
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
