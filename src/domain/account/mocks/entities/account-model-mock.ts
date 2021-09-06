import { AccountModel } from '@/domain/account/entities'
import faker from 'faker'

export const mockAccountModel = (): AccountModel => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
