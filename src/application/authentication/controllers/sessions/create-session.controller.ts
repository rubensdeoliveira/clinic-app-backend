import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { CreateSessionUseCase } from '@/domain/authentication/use-cases'
import { InvalidCredentialsError } from '@/domain/authentication/errors'
import { AccountModel } from '@/domain/authentication/entities'

type HttpRequest = { email: string; password: string }
type Model =
  | Error
  | { account: AccountModel; token: string; refresh_token: string }

export class CreateSessionController extends Controller {
  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {
    super()
  }

  async perform({
    email,
    password,
  }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const session = await this.createSessionUseCase({ email, password })
      delete session.account.password
      return ok(session)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return badRequest(new InvalidCredentialsError())
      }
      throw error
    }
  }
}
