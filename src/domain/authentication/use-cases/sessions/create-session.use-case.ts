import { SessionModel, CreateSessionDTO } from '@/domain/authentication'

export interface CreateSessionUseCase {
  create: (params: CreateSessionDTO) => Promise<SessionModel>
}
