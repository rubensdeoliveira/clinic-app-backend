import { EntityModel } from '@/domain/common/entities'
import { CreateEntityDTO } from '@/domain/common/dtos'

export interface CreateEntityRepository<EntityType extends EntityModel> {
  create: (params: CreateEntityDTO<EntityType>) => Promise<EntityType>
}
