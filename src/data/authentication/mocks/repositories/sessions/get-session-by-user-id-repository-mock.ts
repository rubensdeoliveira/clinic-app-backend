import { GetSessionByUserIdRepository } from '@/data/authentication/repositories'
import { mockSessionModel, SessionModel } from '@/domain/authentication'

export class GetSessionByUserIdRepositorySpy implements GetSessionByUserIdRepository {
  userId: string
  sessions: SessionModel[] = [
    mockSessionModel(),
    mockSessionModel(),
    mockSessionModel(),
    mockSessionModel()
  ]

  async getByUserId (userId: string): Promise<SessionModel[]> {
    this.userId = userId
    return this.sessions
  }
}
