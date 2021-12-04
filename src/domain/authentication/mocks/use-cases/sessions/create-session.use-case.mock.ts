import { CreateSessionUseCase, CreateSessionDTO, SessionModel, mockSessionModel } from '@/domain/authentication'

export class CreateSessionUseCaseSpy implements CreateSessionUseCase {
  params: CreateSessionDTO
  session: SessionModel = mockSessionModel()

  async create (params: CreateSessionDTO): Promise<SessionModel> {
    this.params = params
    return this.session
  }
}
