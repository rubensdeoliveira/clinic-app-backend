import { makeJwtTokenGateway } from '@/main/factories/infra/authentication/gateways'
import { AuthenticationMiddleware } from '@/application/authentication/middlewares'
import { makeAccountsRepository } from '@/main/factories/infra/authentication/repositories/typeorm'
import { AccountType } from '@/domain/authentication/constants'

export const makeAuthenticationMiddleware = (
  accountTypes: AccountType[],
): AuthenticationMiddleware => {
  return new AuthenticationMiddleware(
    makeJwtTokenGateway(),
    makeAccountsRepository(),
    accountTypes,
  )
}
