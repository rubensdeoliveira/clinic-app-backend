import { CreateAccessTokenUseCase, AccessTokenPayloadModel, AccessTokenModel } from '@/domain/authentication'
import { EncryptWithSecret } from '@/data/authentication/protocols'

export class MemoryCreateAccessTokenUseCase implements CreateAccessTokenUseCase {
  constructor (
    private readonly accessTokenValidityInMinutes: number,
    private readonly refreshTokenValidityInMinutes: number,
    private readonly encryptWithSecret: EncryptWithSecret
  ) {}

  async create (params: AccessTokenPayloadModel): Promise<AccessTokenModel> {
    const accessToken = await this.encryptWithSecret.encrypt({
      payload: params,
      subject: params.userId
    }, `${this.accessTokenValidityInMinutes}m`)
    const refreshToken = await this.encryptWithSecret.encrypt({
      payload: params,
      subject: params.userId
    }, `${this.refreshTokenValidityInMinutes}m`)
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user_type: params.userType
    }
  }
}
