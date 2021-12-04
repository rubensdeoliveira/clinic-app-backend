import { ListEntitiesRepositoryDTO } from '@/data/common/repositories'
import { mockOrderDirection } from '@/domain/common'
import faker from 'faker'

export const mockListEntitiesRepositoryDTO = (): ListEntitiesRepositoryDTO => ({
  recordsPerPage: faker.datatype.number(),
  textToSearch: faker.random.words(),
  skip: faker.datatype.number(),
  orderDirection: mockOrderDirection(),
  orderColumn: faker.database.column()
})
