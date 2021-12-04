import { SessionModel } from '@/domain/authentication'

export interface ValidateSessionByIdUseCase {
  validate: (sessionId: string) => Promise<SessionModel>
}
