import { AccountModel, AddAccountDTO } from '@/domain/account/entities'
import { AddAccountUseCase } from '@/domain/account/use-cases'
import { mockAccountModel } from '../../mocks'

export class AddAccountUseCaseSpy implements AddAccountUseCase {
  account: AddAccountDTO
  accountModel: AccountModel = mockAccountModel()

  async add (account: AddAccountDTO): Promise<AccountModel> {
    this.account = account
    return new Promise(resolve => resolve(this.accountModel))
  }
}
