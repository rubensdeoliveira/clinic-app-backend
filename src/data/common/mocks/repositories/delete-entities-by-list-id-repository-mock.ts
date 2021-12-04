import { DeleteEntitiesByListIdRepository } from '@/data/common/repositories'

export class DeleteEntitiesByListIdRepositorySpy<EntityType> implements DeleteEntitiesByListIdRepository<EntityType> {
  listEntityId: string[]

  async deleteByListId (listEntityId: string[]): Promise<EntityType | undefined> {
    this.listEntityId = listEntityId
    return undefined
  }
}
