import { forbidden, HttpRequest, HttpResponse, Middleware, unprocessableEntity } from '@/presentation/common/protocols'
import { AccessTokenPayloadModel, ValidateSessionByIdUseCase, UserType } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { InvalidCredentialsError, SessionNotFoundError } from '@/data/authentication/errors'
import { AccessDeniedError } from '@/presentation/authentication/errors'

export type AuthenticatedRequest = {
  access_token: string
}

export class AuthenticatedRequestMiddleware implements Middleware<AuthenticatedRequest, AccessTokenPayloadModel | object> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly validateSessionByIdUseCase: ValidateSessionByIdUseCase,
    private readonly UserTypesWithAccess: UserType[]
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<AccessTokenPayloadModel | object>> {
    try {
      const errors = this.validator.validate(request.headers)
      if (errors) {
        return forbidden(new AccessDeniedError())
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      if (error instanceof SessionNotFoundError) {
        return forbidden(new AccessDeniedError())
      }
      return unprocessableEntity(new InvalidCredentialsError())
    }
  }
}
