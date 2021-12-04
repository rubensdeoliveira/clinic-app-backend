import { SessionModel } from '@/domain/authentication'
import faker from 'faker'

export const mockSessionModel = (accountId: string = faker.datatype.uuid()): SessionModel => ({
  id: faker.datatype.uuid(),
  account_id: accountId,
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
