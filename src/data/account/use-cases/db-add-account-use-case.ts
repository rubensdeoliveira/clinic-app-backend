import { AccountModel, AddAccountDTO } from '@/domain/account/entities'
import { AddAccountUseCase } from '@/domain/account/use-cases'
import { Encrypter } from '@/data/common/protocols'
import { AddAccountRepository } from '@/data/account/protocols'

export class DbAddAccountUseCase implements AddAccountUseCase {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountDTO): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
