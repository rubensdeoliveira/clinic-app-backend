import { AccountEntity } from '@/infra/account/repositories/typeorm'
import { CommonRepositoryTypeORM } from '@/infra/common/repositories'
import { Repository, getRepository } from 'typeorm'

export class AccountRepositoryTypeOrm extends CommonRepositoryTypeORM<AccountEntity> {
  createRepositoryTypeORM (): Repository<AccountEntity> {
    return getRepository<AccountEntity>(AccountEntity)
  }
}
