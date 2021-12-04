import { AccessTokenPayloadModel, RecoverAccessTokenPayloadUseCase } from '@/domain/authentication'
import { DecryptWithSecret } from '@/data/authentication/protocols'
import { InvalidCredentialsError } from '@/data/authentication/errors'

export class MemoryRecoverAccessTokenPayloadUseCase implements RecoverAccessTokenPayloadUseCase {
  constructor (
    private readonly decryptWithSecret: DecryptWithSecret
  ) {}

  async recover (token: string): Promise<AccessTokenPayloadModel> {
    try {
      const payload = await this.decryptWithSecret.decrypt(token)
      return payload.payload as AccessTokenPayloadModel
    } catch {
      throw new InvalidCredentialsError()
    }
  }
}
