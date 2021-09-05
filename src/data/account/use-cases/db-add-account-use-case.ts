import { AccountModel, AddAccountDTO } from '@/domain/account/entities'
import { AddAccountUseCase } from '@/domain/account/use-cases'
import { Encrypter } from '@/data/common/protocols'

export class DbAddAccountUseCase implements AddAccountUseCase {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountDTO): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
