import { UserTypeModel } from '@/domain/authentication'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
  userType?: UserTypeModel
}
