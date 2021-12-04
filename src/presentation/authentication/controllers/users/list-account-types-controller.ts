import { Controller, HttpRequest, HttpResponse, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { AuthenticatedRequest } from '@/presentation/auth/requests'
import { UserType, ListUserTypeUseCase } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'

type ListUserTypesResponse = UserType[] | Error | object

export class ListUserTypesController implements Controller<AuthenticatedRequest, ListUserTypesResponse> {
  constructor (
    private readonly bodyRequestValidator: RequestValidator,
    private readonly listUserTypeUseCase: ListUserTypeUseCase
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<ListUserTypesResponse>> {
    const errors = this.bodyRequestValidator.validate(Object(request.body.access_token))
    if (errors) {
      return unprocessableEntity(errors)
    }

    try {
      const userTypes = await this.listUserTypeUseCase.list(request.body.access_token.userType)
      return ok(userTypes)
    } catch (error) {
      return serverError(error)
    }
  }
}
