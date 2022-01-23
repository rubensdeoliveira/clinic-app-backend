import { AccountTokensRepository } from '@/infra/authentication/repositories/typeorm'

export const makeAccountTokensRepository = (): AccountTokensRepository => {
  return new AccountTokensRepository()
}
