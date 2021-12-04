import { AccessTokenModel, AccessTokenPayloadModel } from '@/domain/authentication'

export interface CreateAccessTokenUseCase {
  create: (params: AccessTokenPayloadModel) => Promise<AccessTokenModel>
}
