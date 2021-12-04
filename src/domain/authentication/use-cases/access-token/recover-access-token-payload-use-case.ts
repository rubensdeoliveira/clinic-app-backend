import { AccessTokenPayloadModel } from '@/domain/authentication'

export interface RecoverAccessTokenPayloadUseCase {
  recover: (token: string) => Promise<AccessTokenPayloadModel>
}
