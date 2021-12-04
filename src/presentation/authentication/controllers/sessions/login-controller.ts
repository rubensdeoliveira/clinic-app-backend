import { Controller, created, HttpRequest, HttpResponse, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { AccessTokenModel, LoginUseCase } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { LoginRequest } from '@/presentation/authentication/requests'

export class LoginController implements Controller<LoginRequest, AccessTokenModel | Error | object> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly loginUseCase: LoginUseCase
  ) {}

  async handle (request: HttpRequest<LoginRequest>): Promise<HttpResponse<AccessTokenModel | Error | object>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    const { email, password } = request.body
    try {
      const accessToken = await this.loginUseCase.login({
        email,
        password
      })
      return created(accessToken)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
