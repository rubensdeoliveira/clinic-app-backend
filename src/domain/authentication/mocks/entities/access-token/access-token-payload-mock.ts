import { mockUserTypeModel, AccessTokenPayloadModel } from '@/domain/authentication'
import faker from 'faker'

export const mockAccessTokenPayloadModel = (userId: string = faker.datatype.uuid(), sessionId: string = faker.datatype.uuid()): AccessTokenPayloadModel => ({
  sessionId,
  userId,
  name: faker.name.findName(),
  email: faker.internet.email(),
  userType: mockUserTypeModel()
})
