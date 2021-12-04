import { UserTypeModel } from '@/domain/authentication'

export type AccessTokenPayloadModel = {
  sessionId: string
  userId: string
  name: string
  email: string
  userType: UserTypeModel
}
