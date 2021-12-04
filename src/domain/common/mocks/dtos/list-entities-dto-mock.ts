import { ListEntitiesDTO } from '@/domain/common'
import faker from 'faker'

export const mockListEntitiesDTO = (): ListEntitiesDTO => ({
  textToSearch: faker.random.words(),
  page: faker.datatype.number(),
  recordsPerPage: faker.datatype.number()
})
