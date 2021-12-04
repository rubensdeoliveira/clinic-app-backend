import { UserModel, UserStatusModel, UserTypeModel } from '@/domain/authentication'

export type UpdateUserRepositoryDTO = {
  id: string
  name: string
  email: string
  password: string
  type: UserTypeModel
  status: UserStatusModel
}

export interface UpdateUserRepository {
  update: (params: UpdateUserRepositoryDTO) => Promise<UserModel>
}
