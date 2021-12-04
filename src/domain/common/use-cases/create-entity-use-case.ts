import { CreateEntityDTO, EntityModel } from '@/domain/common'

export interface CreateEntityUseCase<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>> {
  create: (params: CreateEntityDTOType) => Promise<EntityType>
}
