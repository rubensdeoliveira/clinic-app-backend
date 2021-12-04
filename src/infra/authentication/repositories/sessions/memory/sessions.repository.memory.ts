import { SessionModel } from '@/domain/authentication'
import { DeleteSessionByUserIdRepository, GetSessionByUserIdRepository } from '@/data/authentication/repositories'
import { CommonRepositoryMemory } from '@/infra/common/repositories'

export class SessionsRepositoryMemory extends CommonRepositoryMemory<SessionModel>
  implements DeleteSessionByUserIdRepository, GetSessionByUserIdRepository {
  public static instance: SessionsRepositoryMemory

  public static getRepository (): SessionsRepositoryMemory {
    if (!SessionsRepositoryMemory.instance) {
      SessionsRepositoryMemory.instance = new SessionsRepositoryMemory()
    }
    return SessionsRepositoryMemory.instance
  }

  async deleteByUserId (accountId: string): Promise<void> {
    this.entities = this.entities.filter(session => session.user_id !== accountId)
  }

  async getByUserId (accountId: string): Promise<SessionModel[]> {
    return this.entities.filter(session => session.user_id === accountId)
  }
}
