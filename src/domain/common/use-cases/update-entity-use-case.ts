import { UpdateEntityDTO, EntityModel } from '@/domain/common'

export interface UpdateEntityUseCase<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>> {
  update: (entityId: string, params: UpdateEntityDTOType) => Promise<EntityType>
}
