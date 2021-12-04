import { UserTypeModel, UserStatusModel } from '@/domain/authentication'
import { EntityModel } from '@/domain/common'

export type UserModel = EntityModel & {
  name: string
  email: string
  password: string
  type: UserTypeModel
  status: UserStatusModel
}
