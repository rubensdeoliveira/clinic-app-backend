import { UserModel, CreateUserDTO } from '@/domain/authentication'

export interface CreateUserUseCase {
  create: (params: CreateUserDTO) => Promise<UserModel>
}
