import {
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from '@/application/common/helpers'
import { Middleware } from '@/application/common/middlewares'
import { AccountType } from '@/domain/authentication/constants'
import {
  GetAccountByIdContract,
  TokenValidatorContract,
} from '@/domain/authentication/contracts'

type HttpRequest = { authorization: string }
type Model = Error | { accountId: string }

export class AuthenticationMiddleware implements Middleware {
  constructor(
    private readonly tokenGateway: TokenValidatorContract,
    private readonly accountsRepository: GetAccountByIdContract,
    private readonly accountTypes: AccountType[],
  ) {}

  async handle({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!authorization) {
      return unauthorized()
    }
    const [, token] = authorization.split(' ')
    try {
      const { sub: accountId } = this.tokenGateway.validateToken({ token })
      const account = await this.accountsRepository.getById({ id: accountId })
      if (this.accountTypes.some(accountType => accountType === account.type)) {
        return ok({ accountId })
      } else {
        return forbidden()
      }
    } catch {
      return unauthorized()
    }
  }
}
