import {
  GetUserByEmailRepository
} from '@/data/authentication/repositories'
import { UserEntity } from '@/infra/authentication/repositories/users/typeorm'
import { CommonRepositoryTypeORM } from '@/infra/common/repositories'
import { getRepository, Repository } from 'typeorm'

export class UsersRepositoryTypeORM extends CommonRepositoryTypeORM<UserEntity>
  implements GetUserByEmailRepository {
  createRepositoryTypeORM (): Repository<UserEntity> {
    return getRepository<UserEntity>(UserEntity)
  }

  async getByEmail (email: string): Promise<UserEntity> {
    const repository = await this.getRepositoryTypeORM()
    return await repository.findOne({
      where: {
        email
      }
    })
  }
}
