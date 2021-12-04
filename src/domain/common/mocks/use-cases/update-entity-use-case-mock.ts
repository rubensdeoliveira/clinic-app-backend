import { UpdateEntityUseCase, UpdateEntityDTO, EntityModel } from '@/domain/common'

export class UpdateEntityUseCaseSpy<EntityType extends EntityModel, EntityDTOType = UpdateEntityDTO<EntityType>> implements UpdateEntityUseCase<EntityType, EntityDTOType> {
  entityId: string
  params: EntityDTOType
  entity: EntityType

  async update (entityId: string, params: EntityDTOType): Promise<EntityType> {
    this.entityId = entityId
    this.params = params
    return this.entity
  }
}
