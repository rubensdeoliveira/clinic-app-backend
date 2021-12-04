import { EntityModel } from '@/domain/common'

export interface ListEntitiesByListIdRepository<EntityType extends EntityModel> {
  listByListId: (listId: string[]) => Promise<EntityType[]>
}
