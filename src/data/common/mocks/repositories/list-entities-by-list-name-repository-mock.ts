import { EntityModel } from '@/domain/common'
import { ListEntitiesByListNameRepository } from '@/data/common/repositories'

export class ListEntitiesByListNameRepositorySpy<EntityType extends EntityModel> implements ListEntitiesByListNameRepository<EntityType> {
  listName: string[]
  entities: EntityType[]

  async listByListName (listName: string[]): Promise<EntityType[]> {
    this.listName = listName
    return this.entities
  }
}
