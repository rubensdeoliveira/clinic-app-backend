import { AccountModel, AddAccountDTO } from '../entities'

export interface AddAccountUseCase {
  add: (account: AddAccountDTO) => Promise<AccountModel>
}
