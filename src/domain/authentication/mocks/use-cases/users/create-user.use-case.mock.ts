import { CreateUserUseCase, CreateUserDTO, UserModel, mockUserModel } from '@/domain/authentication'

export class CreateUserUseCaseSpy implements CreateUserUseCase {
  params: CreateUserDTO
  account: UserModel = mockUserModel()

  async create (params: CreateUserDTO): Promise<UserModel> {
    this.params = params
    return this.account
  }
}
