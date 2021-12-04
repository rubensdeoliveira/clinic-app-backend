import { CreateEntityDTO, EntityModel } from '@/domain/common'

export interface CreateEntityInBulkRepository<EntityType extends EntityModel> {
  createInBulk: (params: Array<CreateEntityDTO<EntityType>>) => Promise<EntityType[]>
}
