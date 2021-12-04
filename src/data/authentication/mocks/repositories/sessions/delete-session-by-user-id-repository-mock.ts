import { DeleteSessionByUserIdRepository } from '@/data/authentication/repositories'

export class DeleteSessionByUserIdRepositorySpy implements DeleteSessionByUserIdRepository {
  userId: string

  async deleteByUserId (userId: string): Promise<void> {
    this.userId = userId
  }
}
