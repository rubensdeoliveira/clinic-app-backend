import { GetUserByEmailRepository } from '@/data/authentication/repositories'
import { UserModel, mockUserModel } from '@/domain/authentication'

export class GetUserByEmailRepositorySpy implements GetUserByEmailRepository {
  email: string
  account: UserModel = mockUserModel()

  async getByEmail (email: string): Promise<UserModel> {
    this.email = email
    return this.account
  }
}
