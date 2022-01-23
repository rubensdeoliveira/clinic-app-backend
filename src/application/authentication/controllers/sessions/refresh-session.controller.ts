import { Controller } from '@/application/common/controllers'
import { HttpResponse, ok, badRequest } from '@/application/common/helpers'
import { RefreshSessionUseCase } from '@/domain/authentication/use-cases'
import { RefreshTokenError } from '@/domain/authentication/errors'

type HttpRequest = { refresh_token: string }
type Model = Error | { refresh_token: string; token: string }

export class RefreshSessionController extends Controller {
  constructor(private readonly refreshSessionUseCase: RefreshSessionUseCase) {
    super()
  }

  async perform({ refresh_token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const refreshToken = await this.refreshSessionUseCase({ refresh_token })
      return ok(refreshToken)
    } catch (error) {
      if (error instanceof RefreshTokenError) {
        return badRequest(new RefreshTokenError())
      }
      throw error
    }
  }
}
