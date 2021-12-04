import {
  CreateEntityRepository,
  UpdateEntityRepository,
  DeleteEntityByIdRepository,
  GetEntityByIdRepository,
  CountEntitiesRepository,
  ListEntitiesRepository,
  ListEntitiesByListIdRepository,
  CreateEntityInBulkRepository,
  DeleteEntitiesByListIdRepository,
  ListEntitiesByListFieldValueRepository
} from '@/data/common/repositories'
import { EntityModel } from '@/domain/common'

export type CommonRepositoryType<EntityType extends EntityModel> =
CreateEntityRepository<EntityType> |
UpdateEntityRepository<EntityType> |
DeleteEntityByIdRepository<EntityType> |
GetEntityByIdRepository<EntityType> |
CountEntitiesRepository<EntityType> |
ListEntitiesRepository<EntityType> |
ListEntitiesByListIdRepository<EntityType> |
CreateEntityInBulkRepository<EntityType> |
DeleteEntitiesByListIdRepository<EntityType> |
ListEntitiesByListFieldValueRepository<EntityType>
