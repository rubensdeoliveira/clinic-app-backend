import { CreateSessionDTO } from '@/domain/authentication'
import faker from 'faker'

export const mockCreateSessionDTO = (userId: string = faker.datatype.uuid()): CreateSessionDTO => ({
  userId
})
