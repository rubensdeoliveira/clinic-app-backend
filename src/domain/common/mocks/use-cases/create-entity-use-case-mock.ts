import { EntityModel, CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'

export class CreateEntityUseCaseSpy<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements CreateEntityUseCase<EntityType, CreateEntityDTOType> {
  params: CreateEntityDTOType
  entity: EntityType

  async create (params: CreateEntityDTOType): Promise<EntityType> {
    this.params = params
    return this.entity
  }
}
