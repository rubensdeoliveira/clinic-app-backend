import { UpdateEntityUseCase, UpdateEntityDTO, EntityModel } from '@/domain/common'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbUpdateEntityUseCase<EntityType extends EntityModel> implements UpdateEntityUseCase<EntityType> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly updateEntityRepository: UpdateEntityRepository<EntityType>,
    private readonly entityName: string
  ) {}

  async update (entityId: string, params: UpdateEntityDTO<EntityType>): Promise<EntityType> {
    const entity = await this.getEntityByIdRepository.getById(entityId)
    if (!entity) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    return await this.updateEntityRepository.update({
      ...params,
      id: entity.id
    })
  }
}
