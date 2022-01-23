import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { RegisterAccountUseCase } from '@/domain/authentication/use-cases'
import { AccountEmailInUseError } from '@/domain/authentication/errors'

type HttpRequest = { name: string; email: string; password: string }
type Model = Error | { id: string; name: string; email: string }

export class RegisterAccountController extends Controller {
  constructor(private readonly registerAccountUseCase: RegisterAccountUseCase) {
    super()
  }

  async perform({
    name,
    email,
    password,
  }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const account = await this.registerAccountUseCase({
        name,
        email,
        password,
      })
      return ok(account)
    } catch (error) {
      if (error instanceof AccountEmailInUseError) {
        return badRequest(new AccountEmailInUseError())
      }
      throw error
    }
  }
}
