import { AccountModel, AddAccountDTO } from '@/domain/account/entities'
import { mockAccountModel } from '../../../../domain/account/mocks'
import { AddAccountRepository } from '../../protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountData: AddAccountDTO
  account: AccountModel = mockAccountModel()

  async add (accountData: AddAccountDTO): Promise<AccountModel> {
    this.accountData = accountData
    return this.account
  }
}
