import { AccountsRepository } from '@/infra/authentication/repositories/typeorm'

export const makeAccountsRepository = (): AccountsRepository => {
  return new AccountsRepository()
}
