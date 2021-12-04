import { UpdateUserRepository, UpdateUserRepositoryDTO } from '@/data/authentication/repositories'
import { UserModel, mockUserModel } from '@/domain/authentication'

export class UpdateUserRepositorySpy implements UpdateUserRepository {
  params: UpdateUserRepositoryDTO
  user: UserModel = mockUserModel()

  async update (params: UpdateUserRepositoryDTO): Promise<UserModel> {
    this.params = params
    return this.user
  }
}
