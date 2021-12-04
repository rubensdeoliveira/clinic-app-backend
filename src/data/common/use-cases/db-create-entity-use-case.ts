import { EntityModel, CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'
import { CreateEntityRepository } from '@/data/common/repositories'
import { EntityAlreadyExistsError } from '@/data/common/errors'

export class DbCreateEntityUseCase<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements CreateEntityUseCase<EntityType, CreateEntityDTOType> {
  constructor (
    private readonly createEntityRepository: CreateEntityRepository<EntityType>,
    private readonly entityName: string
  ) {}

  async create (params: CreateEntityDTOType): Promise<EntityType> {
    try {
      return await this.createEntityRepository.create(params as unknown as CreateEntityDTO<EntityType>)
    } catch (error) {
      throw new EntityAlreadyExistsError(this.entityName)
    }
  }
}
