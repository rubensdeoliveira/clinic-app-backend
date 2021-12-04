import { conflict, Controller, created, HttpRequest, HttpResponse, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { CreateUserUseCase, AccessTokenModel } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { EmailInUseError } from '@/data/authentication/errors'
import { CreateUserRequest } from '@/presentation/authentication/requests'

export type CreateUserResponse = AccessTokenModel | Error | object

export class CreateUserController implements Controller<CreateUserRequest, CreateUserResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle (request: HttpRequest<CreateUserRequest>): Promise<HttpResponse<CreateUserResponse>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    const { name, email, password } = request.body
    try {
      const accessToken = await this.createUserUseCase.create({
        name,
        email,
        password
      })
      return created(accessToken)
    } catch (error) {
      if (error instanceof EmailInUseError) {
        return conflict(error)
      }
      return serverError(error)
    }
  }
}
