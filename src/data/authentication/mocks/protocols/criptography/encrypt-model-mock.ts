import { EncryptModel } from '@/data/authentication/protocols'
import faker from 'faker'

export const mockEncryptModel = (): EncryptModel => ({
  payload: { [faker.datatype.uuid()]: faker.datatype.uuid() },
  subject: faker.datatype.uuid()
})
