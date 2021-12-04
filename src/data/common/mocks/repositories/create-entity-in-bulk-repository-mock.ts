import { CreateEntityDTO, EntityModel } from '@/domain/common'
import { CreateEntityInBulkRepository } from '@/data/common/repositories'

export class CreateEntityInBulkRepositorySpy<EntityType extends EntityModel> implements CreateEntityInBulkRepository<EntityType> {
  params: Array<CreateEntityDTO<EntityType>>
  entities: EntityType[]

  async createInBulk (params: Array<CreateEntityDTO<EntityType>>): Promise<EntityType[]> {
    this.params = params
    return this.entities
  }
}
