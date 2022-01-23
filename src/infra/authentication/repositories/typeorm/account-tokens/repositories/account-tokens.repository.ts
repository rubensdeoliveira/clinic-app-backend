import { AccountTokenEntity } from '@/infra/authentication/repositories/typeorm'
import { TypeormRepository } from '@/infra/common/repositories/typeorm'
import {
  CreateAccountTokenContract,
  DeleteAccountTokenByIdContract,
  GetAccountTokenByAccountIdAndRefreshTokenTokenContract,
} from '@/domain/authentication/contracts'

export class AccountTokensRepository
  extends TypeormRepository
  implements
    CreateAccountTokenContract,
    GetAccountTokenByAccountIdAndRefreshTokenTokenContract,
    DeleteAccountTokenByIdContract
{
  async create(
    data: CreateAccountTokenContract.Input,
  ): Promise<CreateAccountTokenContract.Output> {
    const accountTokensRepository = this.getRepository(AccountTokenEntity)
    const accountTokenEntity = accountTokensRepository.create(data)
    return accountTokensRepository.save(accountTokenEntity)
  }

  async getByAccountIdAndRefreshToken({
    account_id,
    refresh_token,
  }: GetAccountTokenByAccountIdAndRefreshTokenTokenContract.Input): Promise<GetAccountTokenByAccountIdAndRefreshTokenTokenContract.Output> {
    const accountTokensRepository = this.getRepository(AccountTokenEntity)
    return accountTokensRepository.findOne({ account_id, refresh_token })
  }

  async deleteById({
    id,
  }: DeleteAccountTokenByIdContract.Input): Promise<void> {
    const accountTokensRepository = this.getRepository(AccountTokenEntity)
    accountTokensRepository.delete(id)
  }
}
