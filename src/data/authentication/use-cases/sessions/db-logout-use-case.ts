import { LogoutUseCase, SessionModel } from '@/domain/authentication'
import { DeleteEntityByIdRepository } from '@/data/common/repositories'

export class DbLogoutUseCase implements LogoutUseCase {
  constructor (
    private readonly deleteSessionByIdRepository: DeleteEntityByIdRepository<SessionModel>
  ) {}

  async logout (sessionId: string): Promise<void> {
    this.deleteSessionByIdRepository.deleteById(sessionId)
  }
}
