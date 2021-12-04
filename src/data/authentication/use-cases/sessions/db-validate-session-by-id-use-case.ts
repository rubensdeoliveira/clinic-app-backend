import { GetEntityByIdRepository } from '@/data/common/repositories'
import { ValidateSessionByIdUseCase, SessionModel } from '@/domain/authentication'
import { SessionNotFoundError } from '@/data/authentication/errors'

export class DbValidateSessionByIdUseCase implements ValidateSessionByIdUseCase {
  constructor (
    private readonly getSessionByIdRepository: GetEntityByIdRepository<SessionModel>
  ) {}

  async validate (sessionId: string): Promise<SessionModel> {
    const sessionById = await this.getSessionByIdRepository.getById(sessionId)
    if (!sessionById) {
      throw new SessionNotFoundError()
    }
    return sessionById
  }
}
