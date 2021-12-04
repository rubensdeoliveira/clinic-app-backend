import { Controller, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { LogoutUseCase } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { AuthenticatedRequest } from '@/presentation/auth/requests'

export class LogoutController implements Controller<AuthenticatedRequest, undefined | Error | object> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly logoutUseCase: LogoutUseCase
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<undefined | Error | object>> {
    const errors = this.validator.validate(request.body.access_token)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      await this.logoutUseCase.logout(request.body.access_token.sessionId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
