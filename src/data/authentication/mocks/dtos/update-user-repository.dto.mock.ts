import { UpdateUserRepositoryDTO } from '@/data/authentication/repositories'
import { mockUserTypeModel, mockUserStatusModel } from '@/domain/authentication'
import faker from 'faker'

export const mockUpdateUserRepositoryDTO = (accountId: string = faker.datatype.uuid()): UpdateUserRepositoryDTO => ({
  id: accountId,
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: mockUserTypeModel(),
  status: mockUserStatusModel()
})
