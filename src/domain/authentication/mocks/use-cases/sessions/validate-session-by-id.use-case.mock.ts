import { SessionModel, ValidateSessionByIdUseCase, mockSessionModel } from '@/domain/authentication'

export class ValidateSessionByIdUseCaseSpy implements ValidateSessionByIdUseCase {
  sessionId: string
  session: SessionModel = mockSessionModel()

  async validate (sessionId: string): Promise<SessionModel> {
    this.sessionId = sessionId
    return this.session
  }
}
