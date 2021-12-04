import { DeleteSessionByUserIdRepository, GetSessionByUserIdRepository } from '@/data/authentication/repositories'
import { SessionModel } from '@/domain/authentication'
import { SessionEntity } from '@/infra/authentication/repositories/sessions/typeorm'
import { CommonRepositoryTypeORM } from '@/infra/common/repositories'
import { getRepository, Repository } from 'typeorm'

export class SessionsRepositoryTypeORM extends CommonRepositoryTypeORM<SessionEntity>
  implements DeleteSessionByUserIdRepository, GetSessionByUserIdRepository {
  createRepositoryTypeORM (): Repository<SessionEntity> {
    return getRepository<SessionEntity>(SessionEntity)
  }

  async deleteByUserId (userId: string): Promise<void> {
    const repository = await this.getRepositoryTypeORM()
    repository.delete({
      user_id: userId
    })
  }

  async getByUserId (userId: string): Promise<SessionModel[]> {
    const repository = await this.getRepositoryTypeORM()
    return await repository.find({
      user_id: userId
    })
  }
}
