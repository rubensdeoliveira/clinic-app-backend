import { AccessTokenModel, UserTypeModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessTokenModel = (userType: UserTypeModel = UserTypeModel.administrator): AccessTokenModel => ({
  access_token: datatype.number(),
  refresh_token: datatype.number(),
  user_type: userType
})
