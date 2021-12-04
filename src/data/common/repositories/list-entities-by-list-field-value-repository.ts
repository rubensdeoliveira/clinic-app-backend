import { EntityModel } from '@/domain/common'

export interface ListEntitiesByListFieldValueRepository<EntityType extends EntityModel> {
  listByListFieldValue: (listValues: string[], field: string) => Promise<EntityType[]>
}
