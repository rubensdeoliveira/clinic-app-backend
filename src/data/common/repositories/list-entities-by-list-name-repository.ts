import { EntityModel } from '@/domain/common'

export interface ListEntitiesByListNameRepository<EntityType extends EntityModel> {
  listByListName: (listName: string[]) => Promise<EntityType[]>
}
