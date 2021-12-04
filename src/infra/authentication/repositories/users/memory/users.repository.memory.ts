import {
  GetUserByEmailRepository
} from '@/data/authentication/repositories'
import { UserModel } from '@/domain/authentication'
import { CommonRepositoryMemory } from '@/infra/common/repositories'

export class UsersRepositoryMemory extends CommonRepositoryMemory<UserModel>
  implements GetUserByEmailRepository {
  public static instance: UsersRepositoryMemory

  public static getRepository (): UsersRepositoryMemory {
    if (!UsersRepositoryMemory.instance) {
      UsersRepositoryMemory.instance = new UsersRepositoryMemory()
    }
    return UsersRepositoryMemory.instance
  }

  async getByEmail (email: string): Promise<UserModel> {
    return this.entities.find(user => user.email === email)
  }
}
