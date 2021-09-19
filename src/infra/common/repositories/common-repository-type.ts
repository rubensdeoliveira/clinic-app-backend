import { CreateEntityRepository } from '@/data/common/repositories'
import { EntityModel } from '@/domain/common/entities'

export type CommonRepositoryType<EntityType extends EntityModel> =
| CreateEntityRepository<EntityType>
