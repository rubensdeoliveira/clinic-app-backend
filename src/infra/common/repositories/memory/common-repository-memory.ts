import { CreateEntityRepository } from '@/data/common/repositories'
import { EntityModel } from '@/domain/common/entities'
import { CreateEntityDTO } from '@/domain/common/dtos'
import { v4 } from 'uuid'

export class CommonRepositoryMemory<EntityType extends EntityModel>
implements CreateEntityRepository<EntityType> {
  entities: EntityType[]

  constructor () {
    this.entities = []
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const entity = {
      ...params,
      id: v4(),
      created_at: new Date(),
      updated_at: new Date()
    }
    this.entities.push(entity as EntityType)
    return entity as EntityType
  }
}
