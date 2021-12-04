import { mockOrderDirection, mockCustomFilterConditionalModel, mockCustomFilterOperatorModel } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockListEntitiesRequest = (): HttpRequest<any, any, ListEntitiesRequest> => ({
  queryParams: {
    page: faker.datatype.number(),
    search: faker.random.words(),
    size: faker.datatype.number(),
    order: faker.database.column(),
    direction: mockOrderDirection(),
    f: [
      faker.database.column(),
      faker.database.column()
    ],
    v: [
      faker.datatype.uuid(),
      faker.datatype.uuid()
    ],
    o: [
      mockCustomFilterOperatorModel(),
      mockCustomFilterOperatorModel()
    ],
    c: [
      mockCustomFilterConditionalModel(),
      mockCustomFilterConditionalModel()
    ]
  }
})
