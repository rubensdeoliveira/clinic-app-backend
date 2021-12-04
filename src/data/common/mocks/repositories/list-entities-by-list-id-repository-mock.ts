import { EntityModel } from '@/domain/common'
import { ListEntitiesByListIdRepository } from '@/data/common/repositories'

export class ListEntitiesByListIdRepositorySpy<EntityType extends EntityModel> implements ListEntitiesByListIdRepository<EntityType> {
  listId: string[]
  entities: EntityType[]

  async listByListId (listId: string[]): Promise<EntityType[]> {
    this.listId = listId
    return this.entities
  }
}
