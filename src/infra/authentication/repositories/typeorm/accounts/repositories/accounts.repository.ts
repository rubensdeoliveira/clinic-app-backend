import { AccountEntity } from '@/infra/authentication/repositories/typeorm'
import { TypeormRepository } from '@/infra/common/repositories/typeorm'
import {
  RegisterAccountContract,
  GetAccountByEmailContract,
  GetAccountByIdContract,
  GetAdminIdByAccountIdContract,
} from '@/domain/authentication/contracts'

export class AccountsRepository
  extends TypeormRepository
  implements
    GetAccountByEmailContract,
    GetAccountByIdContract,
    RegisterAccountContract,
    GetAdminIdByAccountIdContract
{
  async register(
    data: RegisterAccountContract.Input,
  ): Promise<RegisterAccountContract.Output> {
    const accountsRepository = this.getRepository(AccountEntity)
    const accountEntity = accountsRepository.create(data)
    await accountsRepository.save(accountEntity)
    return {
      id: accountEntity.id.toString(),
      name: accountEntity.name,
      email: accountEntity.email,
      type: accountEntity.type,
    }
  }

  async getByEmail({
    email,
  }: GetAccountByEmailContract.Input): Promise<GetAccountByEmailContract.Output> {
    const accountsRepository = this.getRepository(AccountEntity)
    const accountEntity = await accountsRepository.findOne({ email })
    return accountEntity || undefined
  }

  async getById({
    id,
  }: GetAccountByIdContract.Input): Promise<GetAccountByIdContract.Output> {
    const accountsRepository = this.getRepository(AccountEntity)
    const accountEntity = await accountsRepository.findOne({ id })
    return accountEntity
      ? {
          id: accountEntity.id.toString(),
          name: accountEntity.name,
          email: accountEntity.email,
          type: accountEntity.type,
        }
      : undefined
  }

  async getAdminIdByAccountId({
    account_id,
  }: GetAdminIdByAccountIdContract.Input): Promise<GetAdminIdByAccountIdContract.Output> {
    const accountsRepository = this.getRepository(AccountEntity)
    const accountEntity = await accountsRepository.findOne({ id: account_id })
    return accountEntity.admin_id || accountEntity.id
  }
}
