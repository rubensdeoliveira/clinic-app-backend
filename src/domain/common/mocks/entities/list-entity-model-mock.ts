import { ListEntityModel } from '@/domain/common'
import faker from 'faker'

export const mockListEntityModel = <EntityType>(list: EntityType[] = [
  faker.random.objectElement<EntityType>(),
  faker.random.objectElement<EntityType>(),
  faker.random.objectElement<EntityType>()
]): ListEntityModel<EntityType> => ({
    data: list,
    last_page: faker.datatype.number(),
    page: faker.datatype.number(),
    record_count: faker.datatype.number()
  })
