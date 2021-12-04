import { UserModel, UserStatusModel, UserTypeModel, mockUserStatusModel, mockUserTypeModel } from '@/domain/authentication'
import { makeCreateHash } from '@/main/factories/authentication/adapters'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { RepositoryType } from '@/infra/common/repositories'
import faker from 'faker'
import { CreateEntityRepository } from '@/data/common/repositories'

export const mockCreateUser = async (password: string, type: UserTypeModel = mockUserTypeModel(), status: UserStatusModel = mockUserStatusModel()): Promise<UserModel> => {
  const createHash = makeCreateHash(13)
  const passwordHash = await createHash.hash(password)
  const user = await AuthRepositoryFactory.GetUsersRepository<CreateEntityRepository<UserModel>>(RepositoryType.Memory).create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: passwordHash,
    type,
    status
  })
  return user
}
