import { CreateAccessTokenUseCase, AccessTokenPayloadModel, AccessTokenModel, mockAccessTokenModel } from '@/domain/authentication'

export class CreateAccessTokenUseCaseSpy implements CreateAccessTokenUseCase {
  params: AccessTokenPayloadModel
  accessToken: AccessTokenModel = mockAccessTokenModel()

  async create (params: AccessTokenPayloadModel): Promise<AccessTokenModel> {
    this.params = params
    return this.accessToken
  }
}
