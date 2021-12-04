import { RecoverAccessTokenPayloadUseCase, AccessTokenPayloadModel, mockAccessTokenPayloadModel } from '@/domain/authentication'

export class RecoverAccessTokenPayloadUseCaseSpy implements RecoverAccessTokenPayloadUseCase {
  token: string
  accessTokenPayload: AccessTokenPayloadModel = mockAccessTokenPayloadModel()

  async recover (token: string): Promise<AccessTokenPayloadModel> {
    this.token = token
    return this.accessTokenPayload
  }
}