import { CreateUserDTO, mockUserTypeModel } from '@/domain/authentication'
import faker from 'faker'

export const mockCreateUserDTO = (): CreateUserDTO => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  userType: mockUserTypeModel()
})
