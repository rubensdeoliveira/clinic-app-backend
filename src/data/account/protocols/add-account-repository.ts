import { AccountModel, AddAccountDTO } from '@/domain/account/entities'

export interface AddAccountRepository {
  add: (account: AddAccountDTO) => Promise<AccountModel>
}
