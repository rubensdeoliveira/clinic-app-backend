import { UserTypeModel } from '@/domain/authentication'

export type AccessTokenModel = {
  access_token: string
  refresh_token: string
  user_type: UserTypeModel
}
