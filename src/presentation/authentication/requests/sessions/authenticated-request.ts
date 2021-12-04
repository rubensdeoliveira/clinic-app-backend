import { AccessTokenPayloadModel } from '@/domain/authentication'

export type AuthenticatedRequest = {
  access_token: AccessTokenPayloadModel
}
