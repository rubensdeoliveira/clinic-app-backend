import { UserModel, mockUserStatusModel, mockUserTypeModel } from '@/domain/authentication'
import { mockEntityModel } from '@/domain/common'
import faker from 'faker'

export const mockUserModel = (): UserModel => ({
  ...mockEntityModel(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: mockUserTypeModel(),
  status: mockUserStatusModel()
})
