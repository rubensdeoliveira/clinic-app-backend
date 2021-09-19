import { AccountModel, AddAccountDTO } from '@/domain/account/entities'

export interface AddAccountUseCase {
  add: (account: AddAccountDTO) => Promise<AccountModel>
}
