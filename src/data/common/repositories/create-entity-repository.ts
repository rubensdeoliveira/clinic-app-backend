import { CreateEntityDTO, EntityModel } from '@/domain/common'

export interface CreateEntityRepository<EntityType extends EntityModel> {
  create: (params: CreateEntityDTO<EntityType>) => Promise<EntityType>
}
