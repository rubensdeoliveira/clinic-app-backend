import { UserStatusModel, UserTypeModel } from '@/domain/authentication'

export type UpdateEmailAndTypeUserByIdDTO = {
  id: string
  email: string
  user_type: UserTypeModel
  user_status: UserStatusModel
}
