import { CreateSessionUseCase, CreateSessionDTO, SessionModel } from '@/domain/authentication'
import { CreateEntityRepository } from '@/data/common/repositories'

export class DbCreateSessionUseCase implements CreateSessionUseCase {
  constructor (
    private readonly createSessionRepository: CreateEntityRepository<SessionModel>
  ) {}

  async create ({ userId }: CreateSessionDTO): Promise<SessionModel> {
    return await this.createSessionRepository.create({
      user_id: userId
    })
  }
}
