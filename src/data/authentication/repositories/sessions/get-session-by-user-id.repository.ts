import { SessionModel } from '@/domain/authentication'

export interface GetSessionByUserIdRepository {
  getByUserId: (userId: string) => Promise<SessionModel[]>
}
